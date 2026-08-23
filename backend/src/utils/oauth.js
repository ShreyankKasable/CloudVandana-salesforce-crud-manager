const crypto = require("crypto");

const generateCodeVerifier = () => crypto.randomBytes(64).toString("base64url");

const generateCodeChallenge = (codeVerifier) => crypto
    .createHash("sha256")
    .update(codeVerifier)
    .digest("base64url");

const generateState = () => crypto.randomBytes(32).toString("hex");

module.exports = {
    generateCodeVerifier,
    generateCodeChallenge,
    generateState,
};
