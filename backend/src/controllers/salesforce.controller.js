const AppError = require("../utils/AppError");

const { getRecords } = require("../services/salesforce.service");

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

module.exports = {
    getSalesforceRecords,
};