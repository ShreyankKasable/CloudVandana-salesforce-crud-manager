const AppError = require("../utils/AppError");
const { SALESFORCE_OBJECTS } = require("../config/salesforceObjects");

const validateSalesforceCreatePayload = (req, res, next) => {

    const { objectName } = req.params;
    const data = req.body;

    if (
        !data ||
        typeof data !== "object" ||
        Array.isArray(data) ||
        Object.keys(data).length === 0
    ) {
        return next(new AppError(
            "Record data is required",
            400,
            "SALESFORCE_RECORD_DATA_REQUIRED"
        ));
    }

    const allowedFields = SALESFORCE_OBJECTS[objectName].createFields;
    const providedFields = Object.keys(data);

    const invalidFields = providedFields.filter(
        (field) => !allowedFields.includes(field)
    );

    if(invalidFields.length > 0){

        return next( new AppError(
            `Invalid fields: ${invalidFields.join(", ")}`,
            400,
            "INVALID_SALESFORCE_FIELDS"
        ));
    }
    next();
};

module.exports = validateSalesforceCreatePayload;