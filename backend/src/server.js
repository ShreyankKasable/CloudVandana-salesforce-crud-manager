const app = require("./app");
const redisClient = require("./config/redis");
const config = require("./config/env");

async function startServer() {
    try {
        await redisClient.connect();

        app.listen(config.port, () => {
            console.log(`Server running on http://localhost:${config.port}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
}

startServer();
