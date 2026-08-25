import api from "./api";
import { API_URLS } from "../config/apiUrls";

const unwrap = (response) => response.data.data;

export const getSalesforceFields = async (objectName) =>
  unwrap(await api.get(API_URLS.SALESFORCE_FIELDS(objectName)));

export const getSalesforceRecords = async (objectName, page = 1) =>
  unwrap(await api.get(API_URLS.SALESFORCE_RECORDS(objectName, page)));

export const getSalesforceRecordById = async (objectName, recordId) =>
  unwrap(await api.get(API_URLS.SALESFORCE_RECORD_BY_ID(objectName, recordId)));

export const createSalesforceRecord = async (objectName, data) =>
  unwrap(await api.post(API_URLS.CREATE_SALESFORCE_RECORD(objectName), data));

export const updateSalesforceRecord = async (objectName, recordId, data) =>
  unwrap(await api.patch(API_URLS.UPDATE_SALESFORCE_RECORD(objectName, recordId), data));

export const deleteSalesforceRecord = async (objectName, recordId) =>
  unwrap(await api.delete(API_URLS.DELETE_SALESFORCE_RECORD(objectName, recordId)));
