const AppError = require("../utils/AppError");

const requireSalesforceAuth = (req, res, next) => {
    const salesforceSession = req.session.salesforce;

    if (!salesforceSession) {
        return next(new AppError(
            "Salesforce authentication required",
            401,
            "SALESFORCE_AUTH_REQUIRED"
        ));
    }

    if (!salesforceSession.accessToken || !salesforceSession.instanceUrl) {
        return next(new AppError(
            "Invalid Salesforce session",
            401,
            "INVALID_SALESFORCE_SESSION"
        ));
    }

    next();
};

module.exports = requireSalesforceAuth;
