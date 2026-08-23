const express = require("express");
const requireSalesforceAuth = require("../middleware/salesforceAuth.middleware");
const validateSalesforceObject = require("../middleware/validateSalesforceObject.middleware");
const { getSalesforceRecords } = require("../controllers/salesforce.controller");

const router = express.Router();

router.use(requireSalesforceAuth);


router.get("/:objectName", validateSalesforceObject, getSalesforceRecords);

module.exports = router;
