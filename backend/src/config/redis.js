const { createClient } = require("redis");
const config = require("./env");

const redisClient = createClient({
    url: config.redisUrl,
});

redisClient.on("error", (error) => {
    console.error("Redis error:", error);
});

redisClient.on("ready", () => {
    console.log("Redis is ready");
});

module.exports = redisClient;
