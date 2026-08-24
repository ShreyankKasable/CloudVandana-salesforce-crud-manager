const AppError = require("../utils/AppError");

const { refreshSalesforceAccessToken } = require("./salesforceAuth.service");

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

        const refreshedTokens = await refreshSalesforceAccessToken(
                salesforceSession.refreshToken
            );


        salesforceSession.accessToken = refreshedTokens.accessToken;

        salesforceSession.refreshToken = refreshedTokens.refreshToken;

        salesforceSession.instanceUrl = refreshedTokens.instanceUrl || salesforceSession.instanceUrl;


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