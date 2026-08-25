const AppError = require("../utils/AppError");

const { refreshSalesforceTokensWithLock } = require("./salesforceRefreshLock.service");

const isExpiredSalesforceSession = (error) => {
    const status =
        error.response?.status;

    const errorCode =
        error.response?.data?.[0]?.errorCode;

    return (
        status === 401 ||
        errorCode === "INVALID_SESSION_ID"
    );
};


const executeSalesforceRequest = async ({
    salesforceSession,
    sessionId,
    request,
}) => {

    try {
        return await request({
            accessToken:
                salesforceSession.accessToken,

            instanceUrl:
                salesforceSession.instanceUrl,
        });

    } catch (error) {

        if (!isExpiredSalesforceSession(error)) {
            throw error;
        }

        if (!salesforceSession.refreshToken) {
            throw new AppError(
                "Salesforce authentication is required again",
                401,
                "SALESFORCE_REAUTH_REQUIRED"
            );
        }

        await refreshSalesforceTokensWithLock({
            sessionId,
            salesforceSession,
        });

        return await request({
            accessToken:
                salesforceSession.accessToken,

            instanceUrl:
                salesforceSession.instanceUrl,
        });
    }
};


module.exports = {
    executeSalesforceRequest,
};