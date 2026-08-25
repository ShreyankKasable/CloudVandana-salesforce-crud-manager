const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "");

const buildUrl = (path) => `${API_BASE_URL}${path}`;

export const API_URLS = {
  SALESFORCE_LOGIN: buildUrl("/auth/salesforce"),
  SALESFORCE_RECORDS: (objectName, page = 1) =>
    buildUrl(`/api/salesforce/${objectName}?page=${page}`),
  SALESFORCE_FIELDS: (objectName) =>
    buildUrl(`/api/salesforce/${objectName}/fields`),
  SALESFORCE_RECORD_BY_ID: (objectName, recordId) =>
    buildUrl(`/api/salesforce/${objectName}/${recordId}`),
  CREATE_SALESFORCE_RECORD: (objectName) =>
    buildUrl(`/api/salesforce/${objectName}`),
  UPDATE_SALESFORCE_RECORD: (objectName, recordId) =>
    buildUrl(`/api/salesforce/${objectName}/${recordId}`),
  DELETE_SALESFORCE_RECORD: (objectName, recordId) =>
    buildUrl(`/api/salesforce/${objectName}/${recordId}`),
};

export { API_BASE_URL };
