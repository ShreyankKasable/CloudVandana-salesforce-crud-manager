const axios = require("axios");
const config = require("../config/env");
const mapSalesforceError = require("../utils/salesforceError");
const { executeSalesforceRequest } = require("./salesforceClient.service");
const { SALESFORCE_OBJECTS } = require("../config/salesforceObjects");

const getObjectFields = async ({
    objectName,
    salesforceSession,
    sessionId,
}) => {
    const configuredFields = SALESFORCE_OBJECTS[objectName].fields;

    try {
        const response = await executeSalesforceRequest({
            salesforceSession,
            sessionId,
            request: ({ accessToken, instanceUrl }) => axios.get(
                `${instanceUrl}/services/data/${config.salesforceApiVersion}/sobjects/${objectName}/describe`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            ),
        });

        const fieldsByName = new Map(
            (response.data.fields || []).map((field) => [field.name, field])
        );

        const fields = configuredFields
            .map((fieldName) => fieldsByName.get(fieldName))
            .filter(Boolean)
            .map((field) => ({
                name: field.name,
                label: field.label,
                type: field.type,
                createable: field.createable,
                updateable: field.updateable,
                required: !field.nillable && !field.defaultedOnCreate,
                options: (field.picklistValues || [])
                    .filter((option) => option.active)
                    .map(({ label, value }) => ({ label, value })),
            }));

        return {
            objectName,
            fields,
        };
    } catch (error) {
        throw mapSalesforceError(error, "metadata");
    }
};

module.exports = {
    getObjectFields,
};
