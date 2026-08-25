const crypto = require("crypto");

const redisClient = require("../config/redis");
const AppError = require("../utils/AppError");

const { refreshSalesforceAccessToken } = require("./salesforceAuth.service");

const LOCK_TTL = 10000;
const RESULT_TTL = 15;
const RETRY_DELAY = 100;
const MAX_RETRIES = 50;

const sleep = (ms) => {
    return new Promise((resolve) => {
        return setTimeout(resolve, ms);
    });
}

const getTokenFingerprint = (accessToken) => {
    return crypto
        .createHash("sha256")
        .update(accessToken)
        .digest("hex")
        .slice(0, 16);
};

const applyTokensToSession = (
    salesforceSession,
    tokens
) => {
    salesforceSession.accessToken = tokens.accessToken;
    salesforceSession.refreshToken = tokens.refreshToken;
    salesforceSession.instanceUrl = tokens.instanceUrl || salesforceSession.instanceUrl;
}

const releaseLock = async (lockKey, lockId) => {

    const script = `
        if redis.call("GET", KEYS[1]) == ARGV[1] then
            return redis.call("DEL", KEYS[1])
        end

        return 0
    `;

    await redisClient.eval(script, {
        keys: [lockKey],
        arguments: [lockId]
    });
};

const refreshSalesforceTokensWithLock = async ({
    sessionId,
    salesforceSession
}) => {

    const tokenFingerprint = getTokenFingerprint(
        salesforceSession.accessToken
    );

    const lockKey = 
        `salesforce:refresh-lock:${sessionId}:${tokenFingerprint}`;

    const resultKey =
        `salesforce:refresh-result:${sessionId}:${tokenFingerprint}`; 

    
    for(let attempt = 0; attempt < MAX_RETRIES; attempt++) {

        const existingResult = await redisClient.get(resultKey);

        if(existingResult) {

            const tokens = JSON.parse(existingResult);

            applyTokensToSession(salesforceSession, tokens);

            return tokens;
        }

        const lockId = crypto.randomUUID();

        const lockAcquired = await redisClient.set(
            lockKey, 
            lockId, 
            {
                NX: true,
                PX: LOCK_TTL
            }
        );

        if(lockAcquired) {

            try {
                const refreshedTokens = await refreshSalesforceAccessToken(
                    salesforceSession.refreshToken
                );

                applyTokensToSession( salesforceSession, refreshedTokens );

                await redisClient.set( 
                    resultKey, 
                    JSON.stringify(refreshedTokens), 
                    {
                        EX: RESULT_TTL
                    }
                );

                return refreshedTokens;
            } finally {
                await releaseLock( lockKey, lockId );
            }
        }
        await sleep(RETRY_DELAY);

    }

    throw new AppError(
        "Salesforce token refresh is taking too long. Please try again.",
        503,
        "SALESFORCE_TOKEN_REFRESH_TIMEOUT"
    );   
}

module.exports = {
    refreshSalesforceTokensWithLock,
};