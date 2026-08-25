const NUMBER_FIELD_TYPES = new Set(["currency", "double", "int", "percent"]);

export const getWritableFields = (fields, mode) =>
  fields.filter((field) => (mode === "create" ? field.createable : field.updateable));

const hasFieldValue = (values, fieldName) =>
  Object.prototype.hasOwnProperty.call(values, fieldName);

const normalizePayloadValue = (field, value) => {
  if (field.type === "boolean") {
    return Boolean(value);
  }

  if (value === "" && (field.type === "date" || NUMBER_FIELD_TYPES.has(field.type))) {
    return null;
  }

  if (NUMBER_FIELD_TYPES.has(field.type)) {
    const numericValue = Number(value);
    return Number.isNaN(numericValue) ? value : numericValue;
  }

  return value;
};

export const buildWritablePayload = ({ fields, values, mode }) =>
  getWritableFields(fields, mode).reduce((payload, field) => {
    if (!hasFieldValue(values, field.name)) {
      return payload;
    }

    const value = values[field.name];

    if (mode === "create" && !field.required && value === "") {
      return payload;
    }

    return {
      ...payload,
      [field.name]: normalizePayloadValue(field, value),
    };
  }, {});

export const formatDisplayValue = (value) => {
  if (value === null || value === undefined || value === "") return "-";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return String(value);
};

export const getRecordLabel = (record) =>
  record?.Name || record?.Subject || record?.CaseNumber || record?.Email || record?.Id;
