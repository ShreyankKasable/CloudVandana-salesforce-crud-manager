const AppError = require("../utils/AppError");

const { getRecords, getRecordById, createRecord, updateRecord, deleteRecord } = require("../services/salesforce.service");

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

    const result = await getRecords({
        objectName,
        page,
        salesforceSession: req.session.salesforce,
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

    const result = await getRecordById({
        objectName,
        recordId,
        salesforceSession: req.session.salesforce,
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
    const result = await createRecord({
        objectName,
        data,
        salesforceSession: req.session.salesforce,
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

const updateSalesforceRecord = async (req, res) => {
    const {
        objectName,
        recordId,
    } = req.params;

    const data = req.body;

    await updateRecord({
        objectName,
        recordId,
        data,
        salesforceSession: req.session.salesforce,
    });

    return res.status(200).json({
        success: true,
        message:
            `${objectName} record updated successfully`,

        data: {
            objectName,
            recordId,
        },
    });
};

const deleteSalesforceRecord = async (req, res) => {
    const {
        objectName,
        recordId,
    } = req.params;

    await deleteRecord({
        objectName,
        recordId,
        salesforceSession: req.session.salesforce,
    });

    return res.status(200).json({
        success: true,
        message: `${objectName} record deleted successfully`,
        data: {
            objectName,
            recordId,
        },
    });
};

module.exports = {
    getSalesforceRecords,
    getSalesforceRecordById,
    createSalesforceRecord,
    updateSalesforceRecord,
    deleteSalesforceRecord
};