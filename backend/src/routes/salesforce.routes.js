const express = require("express");
const requireSalesforceAuth = require("../middleware/salesforceAuth.middleware");
const validateSalesforceObject = require("../middleware/validateSalesforceObject.middleware");
const validateSalesforceRecordId = require("../middleware/validateSalesforceRecordId.middleware");
const validateSalesforceCreatePayload = require("../middleware/validateSalesforceCreatePayload.middleware");
const validateSalesforceUpdatePayload = require("../middleware/validateSalesforceUpdatePayload.middleware");
const { getSalesforceRecords, getSalesforceRecordById, createSalesforceRecord, updateSalesforceRecord, deleteSalesforceRecord } = require("../controllers/salesforce.controller");


const router = express.Router();

router.use(requireSalesforceAuth);


router.get("/:objectName", validateSalesforceObject, getSalesforceRecords);
router.get("/:objectName/:recordId", validateSalesforceObject, validateSalesforceRecordId, getSalesforceRecordById);
router.post(
	"/:objectName",
	validateSalesforceObject,
	validateSalesforceCreatePayload,
	createSalesforceRecord
);

router.patch(
    "/:objectName/:recordId",
    validateSalesforceObject,
    validateSalesforceRecordId,
    validateSalesforceUpdatePayload,
    updateSalesforceRecord
);

router.delete(
    "/:objectName/:recordId",
    validateSalesforceObject,
    validateSalesforceRecordId,
    deleteSalesforceRecord
);

module.exports = router;
