const axios = require("axios");
const config = require("../config/env");

const exchangeAuthorizationCode = async (code, codeVerifier) => {
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
        }
    );

    return {
        accessToken: response.data.access_token,
        refreshToken: response.data.refresh_token,
        instanceUrl: response.data.instance_url,
    };
};

module.exports = {
    exchangeAuthorizationCode,
};
