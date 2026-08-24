const axios = require("axios");
const config = require("../config/env");
const AppError = require("../utils/AppError");

const {
    SALESFORCE_OBJECTS,
    PAGE_SIZE,
} = require("../config/salesforceObjects");

const getRecords = async ({
    objectName,
    accessToken,
    instanceUrl,
    page,
}) => {

    const objectConfig = SALESFORCE_OBJECTS[objectName];
    const offset = (page - 1) * PAGE_SIZE;

    if (offset > 2000) {
        throw new AppError(
            "Requested page exceeds the supported offset pagination range",
            400,
            "PAGINATION_LIMIT_EXCEEDED"
        );
    }

    const queryFields = [
        "Id",
        ...objectConfig.fields,
        "CreatedDate",
    ];

    const soql = `
        SELECT ${queryFields.join(", ")}
        FROM ${objectName}
        ORDER BY CreatedDate DESC, Id DESC
        LIMIT ${PAGE_SIZE + 1}
        OFFSET ${offset}
    `.replace(/\s+/g, " ").trim();

    try {
        const response = await axios.get(
            `${instanceUrl}/services/data/${config.salesforceApiVersion}/query`,
            {
                params: { q: soql },
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        const fetchedRecords = response.data.records || [];

        const hasNextPage = fetchedRecords.length > PAGE_SIZE;

        const records = fetchedRecords
            .slice(0, PAGE_SIZE)
            .map(({ attributes, CreatedDate, ...record }) => record);

        return {
            fields: objectConfig.fields,
            records,
            pagination: {
                page,
                pageSize: PAGE_SIZE,
                hasMore: hasNextPage,
                nextPage: hasNextPage ? page + 1 : null,
            },
        };
    } catch (error) {

        if (error instanceof AppError) {
            throw error;
        }

        const status =
            error.response?.status;

        const salesforceError =
            error.response?.data?.[0]?.errorCode;

        if (
            status === 401 ||
            salesforceError === "INVALID_SESSION_ID"
        ) {
            throw new AppError(
                "Salesforce session has expired",
                401,
                "SALESFORCE_SESSION_EXPIRED"
            );
        }

        if (status === 403) {
            throw new AppError(
                "You do not have permission to access this Salesforce data",
                403,
                "SALESFORCE_ACCESS_DENIED"
            );
        }

        if (status === 400) {
            throw new AppError(
                "Salesforce rejected the record query",
                400,
                "SALESFORCE_QUERY_ERROR"
            );
        }

        throw new AppError(
            "Unable to retrieve records from Salesforce",
            502,
            "SALESFORCE_API_ERROR"
        );
    }

};

const getRecordById = async ({
    objectName,
    recordId,
    accessToken,
    instanceUrl
}) => {
    const objectConfig = SALESFORCE_OBJECTS[objectName];

    const fields = [
        "Id",
        ...objectConfig.fields
    ];

    try {

        const response = await axios.get(
            `${instanceUrl}/services/data/${config.salesforceApiVersion}/sobjects/${objectName}/${recordId}`,
            {
                headers: {
                    "Authorization": `Bearer ${accessToken}` 
                },
                params: {
                    fields: fields.join(',')
                },
            }
        )

        const { attributes, ...record} = response.data;
        
        return { 
            fields: objectConfig.fields,
            record
        };

    } catch (error) {
        const status = error.response?.status;

        const salesforceError =
            error.response?.data?.[0]?.errorCode;

        if (
            status === 401 ||
            salesforceError === "INVALID_SESSION_ID"
        ) {
            throw new AppError(
                "Salesforce session has expired",
                401,
                "SALESFORCE_SESSION_EXPIRED"
            );
        }

        if (status === 404) {
            throw new AppError(
                "Salesforce record not found",
                404,
                "SALESFORCE_RECORD_NOT_FOUND"
            );
        }

        if (status === 403) {
            throw new AppError(
                "You do not have permission to access this Salesforce record",
                403,
                "SALESFORCE_ACCESS_DENIED"
            );
        }

        if (status === 400) {
            throw new AppError(
                "Salesforce rejected the record request",
                400,
                "SALESFORCE_RECORD_REQUEST_ERROR"
            );
        }

        throw new AppError(
            "Unable to retrieve Salesforce record",
            502,
            "SALESFORCE_API_ERROR"
        );
    }
}

const createRecord = async ({
    objectName,
    data,
    accessToken,
    instanceUrl
}) => {

    try {

        const response = await axios.post(
            `${instanceUrl}/services/data/${config.salesforceApiVersion}/sobjects/${objectName}`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                     "Content-Type": "application/json",
                }
            }
        )

        return {
            id: response.data.id,
            success: response.data.success,
        };
    } catch (error) {

        const status =
            error.response?.status;

        const salesforceError =
            error.response?.data?.[0];

        if (
            status === 401 ||
            salesforceError?.errorCode ===
                "INVALID_SESSION_ID"
        ) {
            throw new AppError(
                "Salesforce session has expired",
                401,
                "SALESFORCE_SESSION_EXPIRED"
            );
        }

        if (status === 403) {
            throw new AppError(
                "You do not have permission to create this Salesforce record",
                403,
                "SALESFORCE_ACCESS_DENIED"
            );
        }

        if (
            salesforceError?.errorCode ===
            "REQUIRED_FIELD_MISSING"
        ) {
            throw new AppError(
                salesforceError.message ||
                    "Required Salesforce field is missing",
                400,
                "SALESFORCE_REQUIRED_FIELD_MISSING"
            );
        }

        if (status === 400) {
            throw new AppError(
                salesforceError?.message ||
                    "Salesforce rejected the record data",
                400,
                "SALESFORCE_VALIDATION_ERROR"
            );
        }

        throw new AppError(
            "Unable to create Salesforce record",
            502,
            "SALESFORCE_API_ERROR"
        );
    }
}

module.exports = {
    getRecords,
    getRecordById,
    createRecord
};