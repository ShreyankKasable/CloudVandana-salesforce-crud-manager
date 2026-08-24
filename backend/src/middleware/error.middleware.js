const config = require("../config/env");

const errorHandler = (error, req, res, next) => {
    if (error.code === "SALESFORCE_REAUTH_REQUIRED" && req.session) {
        delete req.session.salesforce;
    }

    const statusCode = error.statusCode || 500;
    const message = error.isOperational
        ? error.message
        : "Internal server error";

    console.error({
        method: req.method,
        path: req.originalUrl,
        statusCode,
        message: error.message,
        stack: config.nodeEnv === "development" ? error.stack : undefined,
    });

    return res.status(statusCode).json({
        success: false,
        message,
        code: error.code || "INTERNAL_ERROR",
    });
};

module.exports = errorHandler;
