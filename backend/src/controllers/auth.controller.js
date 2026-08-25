const config = require("../config/env");
const {
    generateCodeVerifier,
    generateCodeChallenge,
    generateState,
} = require("../utils/oauth");
const { exchangeAuthorizationCode } = require("../services/salesforceAuth.service");
const AppError = require("../utils/AppError");

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
    const {
        code,
        state,
        error,
        error_description,
    } = req.query;

    if (error) {
        throw new AppError(
            error_description || "Salesforce authorization failed",
            400,
            "SALESFORCE_AUTHORIZATION_FAILED"
        );
    }

    if (!code) {
        throw new AppError(
            "Authorization code is missing",
            400,
            "AUTHORIZATION_CODE_MISSING"
        );
    }

    const oauthSession = req.session.salesforceOAuth;

    if (!oauthSession) {
        throw new AppError(
            "OAuth session not found",
            400,
            "OAUTH_SESSION_NOT_FOUND"
        );
    }

    const { codeVerifier, state: savedState } = oauthSession;

    if (state !== savedState) {
        throw new AppError(
            "Invalid OAuth state",
            400,
            "INVALID_OAUTH_STATE"
        );
    }

    const tokens = await exchangeAuthorizationCode(code, codeVerifier);

    req.session.salesforce = {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        instanceUrl: tokens.instanceUrl,
    };

    delete req.session.salesforceOAuth;

    return res.redirect(`${config.frontendUrl}/?auth=success`);
};

module.exports = {
    startSalesforceAuth,
    salesforceCallback,
};
