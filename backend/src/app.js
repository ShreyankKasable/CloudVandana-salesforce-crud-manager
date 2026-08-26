const express = require("express");
const cors = require("cors");

const config = require("./config/env");
const sessionMiddleware = require("./config/session");
const authRoutes = require("./routes/auth.routes");
const salesforceRoutes = require("./routes/salesforce.routes");
const AppError = require("./utils/AppError");
const errorHandler = require("./middleware/error.middleware");

const app = express();

if (config.nodeEnv === "production") {
    app.set("trust proxy", 1);
}

app.use(cors({
    origin: config.frontendUrl,
    credentials: true,
}));
app.use(express.json());
app.use(sessionMiddleware);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Salesforce CRUD Manager backend is running",
    });
});

app.use("/auth", authRoutes);
app.use("/api/salesforce", salesforceRoutes);

app.use((req, res, next) => {
    next(new AppError(
        `Route not found: ${req.method} ${req.originalUrl}`,
        404,
        "ROUTE_NOT_FOUND"
    ));
});

app.use(errorHandler);

module.exports = app;
