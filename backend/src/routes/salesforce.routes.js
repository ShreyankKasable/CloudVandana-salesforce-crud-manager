const express = require("express");
const requireSalesforceAuth = require("../middleware/salesforceAuth.middleware");

const router = express.Router();

router.get("/test", requireSalesforceAuth, (req, res) => {
    res.json({
        success: true,
        message: "Salesforce session is valid",
    });
});

module.exports = router;
