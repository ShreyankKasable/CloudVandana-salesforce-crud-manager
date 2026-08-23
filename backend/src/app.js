const express = require("express");
const cors = require("cors");

const config = require("./config/env");
const sessionMiddleware = require("./config/session");
const authRoutes = require("./routes/auth.routes");

const app = express();

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

module.exports = app;
