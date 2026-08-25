const DEFAULT_API_BASE_URL = "http://localhost:5000";

const normalizeBaseUrl = (baseUrl) => baseUrl.replace(/\/+$/, "");

const resolveApiBaseUrl = () => {
  const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL;

  if (configuredBaseUrl) {
    return normalizeBaseUrl(configuredBaseUrl);
  }

  if (import.meta.env.PROD) {
    console.warn(
      "VITE_API_BASE_URL is not configured. Falling back to the local backend URL.",
    );
  }

  return DEFAULT_API_BASE_URL;
};

const API_BASE_URL = resolveApiBaseUrl();

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
