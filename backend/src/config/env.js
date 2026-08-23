const dotenv = require("dotenv");

dotenv.config();

const requiredEnvVariables = [
    "SESSION_SECRET",
    "REDIS_URL",
    "SALESFORCE_CLIENT_ID",
    "SALESFORCE_CLIENT_SECRET",
    "SALESFORCE_REDIRECT_URI",
    "SALESFORCE_LOGIN_URL",
];

for (const variable of requiredEnvVariables) {
    if (!process.env[variable]) {
        throw new Error(`Missing required environment variable: ${variable}`);
    }
}

module.exports = {
    port: process.env.PORT || 5000,
    nodeEnv: process.env.NODE_ENV || "development",
    frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173",
    sessionSecret: process.env.SESSION_SECRET,
    redisUrl: process.env.REDIS_URL,
    salesforceClientId: process.env.SALESFORCE_CLIENT_ID,
    salesforceClientSecret: process.env.SALESFORCE_CLIENT_SECRET,
    salesforceRedirectUri: process.env.SALESFORCE_REDIRECT_URI,
    salesforceLoginUrl: process.env.SALESFORCE_LOGIN_URL,
};
