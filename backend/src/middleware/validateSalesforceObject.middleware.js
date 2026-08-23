const AppError = require("../utils/AppError");
const { SALESFORCE_OBJECTS } = require("../config/salesforceObjects");

const validateSalesforceObject = (req, res, next) => {
    const { objectName } = req.params;

    if (!Object.prototype.hasOwnProperty.call(SALESFORCE_OBJECTS, objectName)) {
        return next(new AppError(
            `Invalid Salesforce object: ${objectName}`,
            400,
            "INVALID_SALESFORCE_OBJECT"
        ));
    }
    next();
};

module.exports = validateSalesforceObject;