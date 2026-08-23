const session = require("express-session");
const { RedisStore } = require("connect-redis");

const redisClient = require("./redis");
const config = require("./env");

const redisStore = new RedisStore({
    client: redisClient,
    prefix: "cloudvandana:",
});

const sessionMiddleware = session({
    store: redisStore,
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: config.nodeEnv === "production",
        sameSite: "lax",
    },
});

module.exports = sessionMiddleware;
