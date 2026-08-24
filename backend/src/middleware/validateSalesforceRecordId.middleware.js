const AppError = require("../utils/AppError");

const validateSalesForceRecordId = (req, res, next) => {

    const { recordId } = req.params;

    const isValidate = /^[a-zA-Z0-9]{15}([a-zA-Z0-9]{3})?$/.test(recordId);

    if (!isValidate){

        return next(
            new AppError(
                "Invalid Salesforce record ID",
                400,
                "INVALID_SALESFORCE_RECORD_ID"
            )
        );
    }
    next();
}

module.exports = validateSalesForceRecordId;