const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const API_URLS = {
  SALESFORCE_LOGIN: `${API_BASE_URL}/auth/salesforce`,
  SALESFORCE_RECORDS: (objectName, page = 1) =>
    `${API_BASE_URL}/api/salesforce/${objectName}?page=${page}`,
  SALESFORCE_FIELDS: (objectName) =>
    `${API_BASE_URL}/api/salesforce/${objectName}/fields`,
  SALESFORCE_RECORD_BY_ID: (objectName, recordId) =>
    `${API_BASE_URL}/api/salesforce/${objectName}/${recordId}`,
  CREATE_SALESFORCE_RECORD: (objectName) =>
    `${API_BASE_URL}/api/salesforce/${objectName}`,
  UPDATE_SALESFORCE_RECORD: (objectName, recordId) =>
    `${API_BASE_URL}/api/salesforce/${objectName}/${recordId}`,
  DELETE_SALESFORCE_RECORD: (objectName, recordId) =>
    `${API_BASE_URL}/api/salesforce/${objectName}/${recordId}`,
};

export { API_BASE_URL };
