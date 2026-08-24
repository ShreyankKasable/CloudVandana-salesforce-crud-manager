const SALESFORCE_OBJECTS = {
    Account: {
        fields: [
            "Name",
            "Industry",
            "Phone",
            "Website",
            "BillingCity",
            "Type",
        ],

        createFields: [
            "Name",
            "Industry",
            "Phone",
            "Website",
            "BillingCity",
            "Type",
        ],

        updateFields: [
            "Name",
            "Industry",
            "Phone",
            "Website",
            "BillingCity",
            "Type",
        ],
    },

    Opportunity: {
        fields: [
            "Name",
            "StageName",
            "Amount",
            "CloseDate",
            "Type",
            "LeadSource",
        ],

        createFields: [
            "Name",
            "StageName",
            "Amount",
            "CloseDate",
            "Type",
            "LeadSource",
        ],

        updateFields: [
            "Name",
            "StageName",
            "Amount",
            "CloseDate",
            "Type",
            "LeadSource",
        ],
    },

    Lead: {
        fields: [
            "FirstName",
            "LastName",
            "Company",
            "Email",
            "Phone",
            "Status",
        ],

        createFields: [
            "FirstName",
            "LastName",
            "Company",
            "Email",
            "Phone",
            "Status",
        ],

        updateFields: [
            "FirstName",
            "LastName",
            "Company",
            "Email",
            "Phone",
            "Status",
        ],
    },

    Contact: {
        fields: [
            "FirstName",
            "LastName",
            "Email",
            "Phone",
            "Title",
            "Department",
        ],

        createFields: [
            "FirstName",
            "LastName",
            "Email",
            "Phone",
            "Title",
            "Department",
        ],

        updateFields: [
            "FirstName",
            "LastName",
            "Email",
            "Phone",
            "Title",
            "Department",
        ],
    },

    Case: {
        fields: [
            "CaseNumber",
            "Subject",
            "Status",
            "Priority",
            "Origin",
            "Type",
        ],

        createFields: [
            "Subject",
            "Status",
            "Priority",
            "Origin",
            "Type",
        ],

        updateFields: [
            "Subject",
            "Status",
            "Priority",
            "Origin",
            "Type",
        ],
    },
};

const PAGE_SIZE = 20;

module.exports = {
    SALESFORCE_OBJECTS,
    PAGE_SIZE,
};