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

module.exports = {
    exchangeAuthorizationCode,
};
