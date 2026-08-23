const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const session = require("express-session");
const crypto = require("crypto");
const axios = require("axios");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { 
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
    },
}))

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Salesforce CRUD Manager backend is running",
    });
});

app.get("/auth/salesforce", (req, res) => {

    let codeVerifier = crypto.randomBytes(64).toString('base64url');

    const codeChallenge = crypto.createHash('sha256').update(codeVerifier).digest('base64url');

    const state = crypto.randomBytes(32).toString('hex');

    req.session.salesforceOAuth = {
        codeVerifier,
        state,
    };

    const params = new URLSearchParams({
        response_type: "code",
        client_id: process.env.SALESFORCE_CLIENT_ID,
        redirect_uri: process.env.SALESFORCE_REDIRECT_URI,
        scope: "api refresh_token",
        state,
        code_challenge: codeChallenge,
        code_challenge_method: "S256",
    });

      const authorizationUrl = `${process.env.SALESFORCE_LOGIN_URL}/services/oauth2/authorize?${params.toString()}`;

    res.redirect(authorizationUrl);
});

app.get("/auth/salesforce/callback", async (req, res) => {
    try {
        const { code, state, error, error_description } = req.query;

        if (error) {
            return res.status(400).json({
                success: false,
                message: error_description || "Authorization failed",
            });
        }

        if (!code){
            return res.status(400).json({
                success: false,
                message: "Authorization code is missing",
            });
        }

        const oAuthSession = req.session.salesforceOAuth;

        if (!oAuthSession){
            return res.status(400).json({
                success: false,
                message: "OAuth session not found",
            });
        }

        const { codeVerifier, state: savedState  } = oAuthSession;

        if(state !== savedState){
            return res.status(400).json({
                success: false,
                message: "Invalid state parameter",
            });
        }

        const tokenParams = new URLSearchParams({
            grant_type: "authorization_code",
            code,
            client_id: process.env.SALESFORCE_CLIENT_ID,
            client_secret: process.env.SALESFORCE_CLIENT_SECRET,
            redirect_uri: process.env.SALESFORCE_REDIRECT_URI,
            code_verifier: codeVerifier,
        });

        const response = await axios.post(
            `${process.env.SALESFORCE_LOGIN_URL}/services/oauth2/token`,
            tokenParams.toString(),
            {
                headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );

        const { access_token, refresh_token, instance_url } = response.data;

        req.session.salesforce = {
            accessToken: access_token,
            refreshToken: refresh_token,
            instanceUrl: instance_url,
        };

        delete req.session.salesforceOAuth;

        return res.json({
            success: true,
            message: "Salesforce OAuth successful", 
            instanceUrl: instance_url,
        });
    } catch (err) {
        console.error("Error during Salesforce OAuth callback:", err);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});