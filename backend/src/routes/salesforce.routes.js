const express = require("express");
const requireSalesforceAuth = require("../middleware/salesforceAuth.middleware");
const validateSalesforceObject = require("../middleware/validateSalesforceObject.middleware");

const router = express.Router();

router.use(requireSalesforceAuth);


router.get("/:objectName", validateSalesforceObject, (req, res) => {
    res.json({
        success: true,
        objectName: req.params.objectName,
    });
});

module.exports = router;
