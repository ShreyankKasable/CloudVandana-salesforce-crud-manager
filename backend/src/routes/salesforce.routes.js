const express = require("express");
const requireSalesforceAuth = require("../middleware/salesforceAuth.middleware");
const validateSalesforceObject = require("../middleware/validateSalesforceObject.middleware");
const { getSalesforceRecords, getSalesforceRecordById } = require("../controllers/salesforce.controller");
const validateSalesforceRecordId = require("../middleware/validateSalesforceRecordId.middleware");

const router = express.Router();

router.use(requireSalesforceAuth);


router.get("/:objectName", validateSalesforceObject, getSalesforceRecords);
router.get("/:objectName/:recordId", validateSalesforceObject, validateSalesforceRecordId, getSalesforceRecordById);

module.exports = router;
