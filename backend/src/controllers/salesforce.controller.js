const AppError = require("../utils/AppError");

const { getRecords, getRecordById, createRecord } = require("../services/salesforce.service");

const getSalesforceRecords = async (req, res) => {

    const { objectName } = req.params;
    const page = Number(req.query.page || 1);

    if (!Number.isInteger(page) || page < 1) {
        throw new AppError(
            "Page must be a positive integer",
            400,
            "INVALID_PAGE"
        );
    }

    const { accessToken, instanceUrl } = req.session.salesforce;

    const result = await getRecords({
        objectName,
        accessToken,
        instanceUrl,
        page
    });

    return res.status(200).json({
        success: true,
        data: {
            objectName,
            fields: result.fields,
            records: result.records,
            pagination: result.pagination,
        },
    });
};

const getSalesforceRecordById = async (req, res) => {

    const { objectName, recordId } = req.params;

    const {accessToken, instanceUrl} = req.session.salesforce;

    const result = await getRecordById({
        objectName,
        recordId,
        accessToken,
        instanceUrl,
    });

    res.status(200).json({
        success: true,
        data: {
            objectName,
            fields: result.fields,
            record: result.record,
        },
    });
}

const createSalesforceRecord = async (req, res) => {

    const { objectName } = req.params;
    const data = req.body;
    const { accessToken, instanceUrl } = req.session.salesforce;

    const result = await createRecord({
        objectName,
        data,
        accessToken,
        instanceUrl,
    });

    return res.status(201).json({
        success: true,
        message:
            `${objectName} record created successfully`,
        data: {
            objectName,
            recordId: result.id,
        },
    });
}

module.exports = {
    getSalesforceRecords,
    getSalesforceRecordById,
    createSalesforceRecord
};