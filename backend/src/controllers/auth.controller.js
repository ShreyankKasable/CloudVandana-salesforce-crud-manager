const config = require("../config/env");
const {
    generateCodeVerifier,
    generateCodeChallenge,
    generateState,
} = require("../utils/oauth");
const { exchangeAuthorizationCode } = require("../services/salesforceAuth.service");

const startSalesforceAuth = (req, res) => {
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = generateCodeChallenge(codeVerifier);
    const state = generateState();

    req.session.salesforceOAuth = {
        codeVerifier,
        state,
    };

    const params = new URLSearchParams({
        response_type: "code",
        client_id: config.salesforceClientId,
        redirect_uri: config.salesforceRedirectUri,
        scope: "api refresh_token",
        state,
        code_challenge: codeChallenge,
        code_challenge_method: "S256",
    });

    const authorizationUrl = `${config.salesforceLoginUrl}/services/oauth2/authorize?${params.toString()}`;

    res.redirect(authorizationUrl);
};

const salesforceCallback = async (req, res) => {
    try {
        const {
            code,
            state,
            error,
            error_description,
        } = req.query;

        if (error) {
            return res.status(400).json({
                success: false,
                message: error_description || "Salesforce authorization failed",
            });
        }

        if (!code) {
            return res.status(400).json({
                success: false,
                message: "Authorization code is missing",
            });
        }

        const oauthSession = req.session.salesforceOAuth;

        if (!oauthSession) {
            return res.status(400).json({
                success: false,
                message: "OAuth session not found",
            });
        }

        const { codeVerifier, state: savedState } = oauthSession;

        if (state !== savedState) {
            return res.status(400).json({
                success: false,
                message: "Invalid OAuth state",
            });
        }

        const tokens = await exchangeAuthorizationCode(code, codeVerifier);

        req.session.salesforce = {
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            instanceUrl: tokens.instanceUrl,
        };

        delete req.session.salesforceOAuth;

        return res.json({
            success: true,
            message: "Salesforce authentication successful",
            instanceUrl: tokens.instanceUrl,
        });
    } catch (error) {
        console.error(
            "Salesforce authentication error:",
            error.response?.data || error.message
        );

        return res.status(500).json({
            success: false,
            message: "Salesforce authentication failed",
        });
    }
};

module.exports = {
    startSalesforceAuth,
    salesforceCallback,
};
