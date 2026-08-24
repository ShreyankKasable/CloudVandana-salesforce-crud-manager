const axios = require("axios");
const config = require("../config/env");
const AppError = require("../utils/AppError");
const mapSalesforceError = require("../utils/salesforceError");
const { executeSalesforceRequest } = require("./salesforceClient.service");

const {
    SALESFORCE_OBJECTS,
    PAGE_SIZE,
} = require("../config/salesforceObjects");

const getRecords = async ({
    objectName,
    page,
    salesforceSession,
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
        const response = await executeSalesforceRequest({
            salesforceSession,
            request: ({ accessToken, instanceUrl }) => axios.get(
                `${instanceUrl}/services/data/${config.salesforceApiVersion}/query`,
                {
                    params: { q: soql },
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            ),
        });

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
        throw mapSalesforceError(error, "list");
    }

};

const getRecordById = async ({
    objectName,
    recordId,
    salesforceSession,
}) => {
    const objectConfig = SALESFORCE_OBJECTS[objectName];

    const fields = [
        "Id",
        ...objectConfig.fields
    ];

    try {

        const response = await executeSalesforceRequest({
            salesforceSession,
            request: ({ accessToken, instanceUrl }) => axios.get(
                `${instanceUrl}/services/data/${config.salesforceApiVersion}/sobjects/${objectName}/${recordId}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    params: {
                        fields: fields.join(","),
                    },
                }
            ),
        });

        const { attributes, ...record} = response.data;
        
        return { 
            fields: objectConfig.fields,
            record
        };

    } catch (error) {
        throw mapSalesforceError(error, "get");
    }
}

const createRecord = async ({
    objectName,
    data,
    salesforceSession,
}) => {

    try {

        const response = await executeSalesforceRequest({
            salesforceSession,
            request: ({ accessToken, instanceUrl }) => axios.post(
                `${instanceUrl}/services/data/${config.salesforceApiVersion}/sobjects/${objectName}`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                }
            ),
        });

        return {
            id: response.data.id,
            success: response.data.success,
        };
    } catch (error) {
        throw mapSalesforceError(error, "create");
    }
}

const updateRecord = async ({
    objectName,
    recordId,
    data,
    salesforceSession,
}) => {
    try {
        await executeSalesforceRequest({
            salesforceSession,
            request: ({ accessToken, instanceUrl }) => axios.patch(
                `${instanceUrl}/services/data/${config.salesforceApiVersion}/sobjects/${objectName}/${recordId}`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                }
            ),
        });

        return {
            recordId,
        };

    } catch (error) {
        throw mapSalesforceError(
            error,
            "update"
        );
    }
};

const deleteRecord = async ({
    objectName,
    recordId,
    salesforceSession,
}) => {
    try {
        await executeSalesforceRequest({
            salesforceSession,
            request: ({ accessToken, instanceUrl }) => axios.delete(
                `${instanceUrl}/services/data/${config.salesforceApiVersion}/sobjects/${objectName}/${recordId}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            ),
        });

        return {
            recordId,
        };

    } catch (error) {
        throw mapSalesforceError(
            error,
            "delete"
        );
    }
};

module.exports = {
    getRecords,
    getRecordById,
    createRecord,
    updateRecord,
    deleteRecord
};