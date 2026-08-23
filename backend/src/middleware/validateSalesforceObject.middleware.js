const AppError = require('../utils/AppError');

const allowObjects = ['Account', 'Opportunity', 'Lead', 'Contact', 'Case'];

const validateSalesforceObject = (req, res, next) => {
    const { objectName } = req.params;

    if(!allowObjects.includes(objectName)) {
        return next(new AppError(
            `Invalid Salesforce object: ${objectName}`,
            400,
            "INVALID_SALESFORCE_OBJECT" 
        ));
    }
    next();
}

module.exports = validateSalesforceObject;