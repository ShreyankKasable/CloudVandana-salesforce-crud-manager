const axios = require("axios");
const config = require("../config/env");
const AppError = require("../utils/AppError");

const exchangeAuthorizationCode = async (code, codeVerifier) => {
    try {
        const tokenParams = new URLSearchParams({
            grant_type: "authorization_code",
            code,
            client_id: config.salesforceClientId,
            client_secret: config.salesforceClientSecret,
            redirect_uri: config.salesforceRedirectUri,
            code_verifier: codeVerifier,
        });

        const response = await axios.post(
            `${config.salesforceLoginUrl}/services/oauth2/token`,
            tokenParams.toString(),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            },
        );

        return {
            accessToken: response.data.access_token,
            refreshToken: response.data.refresh_token,
            instanceUrl: response.data.instance_url,
        };
    } catch (error) {
        const salesforceError = error.response?.data?.error;

        if (salesforceError === "invalid_grant") {
            throw new AppError(
                "Salesforce authorization code is invalid or expired. Please login again.",
                400,
                "SALESFORCE_INVALID_GRANT"
            );
        }

        throw new AppError(
            "Unable to communicate with Salesforce authentication service",
            502,
            "SALESFORCE_AUTH_SERVICE_ERROR"
        );
    }
};

const refreshSalesforceAccessToken = async (refreshToken) => {

    if(!refreshToken){
        throw new AppError(
            "Salesforce authentication is required again",
            401,
            "SALESFORCE_REAUTH_REQUIRED"
        );
    }

    const tokenParams = new URLSearchParams({
        grant_type: "refresh_token",
        client_id: config.salesforceClientId,
        client_secret: config.salesforceClientSecret,
        refresh_token: refreshToken,
    });

    try {

        const response = await axios.post(
            `${config.salesforceLoginUrl}/services/oauth2/token`,
            tokenParams.toString(),
            {
                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded",
                },
            }
        )

        return {
            accessToken: response.data.access_token,

            refreshToken: response.data.refresh_token || refreshToken,

            instanceUrl: response.data.instance_url,
        };

    } catch (error) {
        const oauthError =
            error.response?.data?.error;

        if (oauthError === "invalid_grant") {
            throw new AppError(
                "Salesforce session has expired. Please login again.",
                401,
                "SALESFORCE_REAUTH_REQUIRED"
            );
        }

        throw new AppError(
            "Unable to refresh Salesforce access token",
            502,
            "SALESFORCE_TOKEN_REFRESH_FAILED"
        );
    }
}

module.exports = {
    exchangeAuthorizationCode,
    refreshSalesforceAccessToken
};
