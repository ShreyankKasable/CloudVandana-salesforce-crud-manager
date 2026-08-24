const AppError = require("./AppError");

const mapSalesforceError = (error, operation) => {
    if (error instanceof AppError) {
        return error;
    }

    const status = error.response?.status;
    const salesforceError = error.response?.data?.[0];
    const errorCode = salesforceError?.errorCode;

    if (status === 401 || errorCode === "INVALID_SESSION_ID") {
        return new AppError(
            "Salesforce session has expired",
            401,
            "SALESFORCE_SESSION_EXPIRED"
        );
    }

    if (status === 403) {
        const message = operation === "create"
            ? "You do not have permission to create this Salesforce record"
            : operation === "update"
            ? "You do not have permission to update this Salesforce record"
            : operation === "get"
                ? "You do not have permission to access this Salesforce record"
                : "You do not have permission to access this Salesforce data";

        return new AppError(
            message,
            403,
            "SALESFORCE_ACCESS_DENIED"
        );
    }

    if ( ["get", "update"].includes(operation) && status === 404 ) {
        return new AppError(
            "Salesforce record not found",
            404,
            "SALESFORCE_RECORD_NOT_FOUND"
        );
    }

    if (operation === "create" && errorCode === "REQUIRED_FIELD_MISSING") {
        return new AppError(
            salesforceError.message || "Required Salesforce field is missing",
            400,
            "SALESFORCE_REQUIRED_FIELD_MISSING"
        );
    }

    if (status === 400) {

        const message =
            operation === "create"
                ? salesforceError?.message ||
                "Salesforce rejected the record data"

            : operation === "update"
                ? salesforceError?.message ||
                "Salesforce rejected the record update"

            : operation === "get"
                ? "Salesforce rejected the record request"

            : "Salesforce rejected the record query";


        const code =
            operation === "create"
                ? "SALESFORCE_VALIDATION_ERROR"

            : operation === "update"
                ? "SALESFORCE_UPDATE_VALIDATION_ERROR"

            : operation === "get"
                ? "SALESFORCE_RECORD_REQUEST_ERROR"

            : "SALESFORCE_QUERY_ERROR";


        return new AppError(
            message,
            400,
            code
        );
    }

    const message =
        operation === "create"
            ? "Unable to create Salesforce record"

        : operation === "update"
            ? "Unable to update Salesforce record"

        : operation === "get"
            ? "Unable to retrieve Salesforce record"

        : "Unable to retrieve records from Salesforce";

    return new AppError(message, 502, "SALESFORCE_API_ERROR");
};

module.exports = mapSalesforceError;
