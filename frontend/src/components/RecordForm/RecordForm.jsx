import styled from "styled-components";

const NUMBER_FIELD_TYPES = new Set(["currency", "double", "int", "percent"]);

const Form = styled.form`
  display: grid;
  gap: var(--space-lg);
`;

const Field = styled.label`
  display: grid;
  gap: var(--space-xs);
  color: var(--text-secondary);
  font-size: var(--font-size-form);
  font-weight: var(--font-weight-bold);
`;

const FieldHeader = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-md);
`;

const Required = styled.em`
  color: var(--danger);
  font-size: var(--font-size-2xs);
  font-style: normal;
  letter-spacing: var(--letter-spacing-required);
  text-transform: uppercase;
`;

const inputStyles = `
  width: var(--size-full);
  min-height: var(--control-height-input);
  padding: var(--space-none) var(--space-md);
  color: var(--text-primary);
  background: var(--surface);
  border: var(--border-width) solid var(--border-strong);
  border-radius: var(--radius-md);

  &:focus {
    border-color: var(--primary);
    outline: var(--focus-ring-width) solid var(--primary-soft);
  }

  &:disabled {
    cursor: not-allowed;
    background: var(--surface-muted);
  }
`;

const TextInput = styled.input`
  ${inputStyles}
`;

const Select = styled.select`
  ${inputStyles}
  cursor: pointer;
`;

const CheckboxRow = styled.span`
  display: flex;
  align-items: center;
  gap: var(--space-checkbox-gap);
  min-height: var(--control-height-input);
  color: var(--text-primary);
  font-weight: var(--font-weight-medium);
`;

const Checkbox = styled.input`
  width: var(--size-checkbox);
  height: var(--size-checkbox);
  accent-color: var(--primary);
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: var(--space-md);
  padding-top: var(--space-sm);
`;

const SecondaryButton = styled.button`
  min-height: var(--control-height-md);
  padding: var(--space-none) var(--space-lg);
  color: var(--text-primary);
  background: var(--surface);
  border: var(--border-width) solid var(--border-strong);
  border-radius: var(--radius-md);
  font-weight: var(--font-weight-bold);
  cursor: pointer;

  &:hover:not(:disabled) {
    background: var(--surface-muted);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: var(--opacity-disabled-strong);
  }
`;

const PrimaryButton = styled.button`
  min-height: var(--control-height-md);
  padding: var(--space-none) var(--space-lg);
  color: var(--text-inverse);
  background: var(--primary);
  border-radius: var(--radius-md);
  font-weight: var(--font-weight-extra-bold);
  cursor: pointer;

  &:hover:not(:disabled) {
    background: var(--primary-hover);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: var(--opacity-disabled-strong);
  }
`;

const NoFields = styled.p`
  margin: var(--space-none);
  padding: var(--space-lg);
  color: var(--text-secondary);
  background: var(--surface-muted);
  border: var(--border-width) solid var(--border);
  border-radius: var(--radius-md);
  line-height: var(--line-height-body);
`;

const inputTypeFor = (field) => {
  if (field.type === "phone") return "tel";
  if (field.type === "email") return "email";
  if (field.type === "url") return "url";
  if (field.type === "date") return "date";
  if (NUMBER_FIELD_TYPES.has(field.type)) return "number";
  return "text";
};

const getEditableFields = (fields, mode) =>
  fields.filter((field) => (mode === "create" ? field.createable : field.updateable));

const RecordForm = ({
  fields,
  values,
  onChange,
  onSubmit,
  onCancel,
  submitting,
  mode,
}) => {
  const editableFields = getEditableFields(fields, mode);
  const submitLabel = mode === "create" ? "Create record" : "Save changes";

  return (
    <Form onSubmit={onSubmit}>
      {editableFields.length === 0 && (
        <NoFields>No writable fields are available for this operation.</NoFields>
      )}

      {editableFields.map((field) => (
        <Field key={field.name}>
          <FieldHeader>
            <span>{field.label || field.name}</span>
            {field.required && <Required>Required</Required>}
          </FieldHeader>

          {field.type === "picklist" ? (
            <Select
              name={field.name}
              value={values[field.name] ?? ""}
              required={field.required}
              disabled={submitting}
              onChange={onChange}
            >
              <option value="">Select an option</option>
              {(field.options || []).map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label || option.value}
                </option>
              ))}
            </Select>
          ) : field.type === "boolean" ? (
            <CheckboxRow>
              <Checkbox
                type="checkbox"
                name={field.name}
                checked={Boolean(values[field.name])}
                required={field.required}
                disabled={submitting}
                onChange={onChange}
              />
              Enabled
            </CheckboxRow>
          ) : (
            <TextInput
              type={inputTypeFor(field)}
              name={field.name}
              value={values[field.name] ?? ""}
              required={field.required}
              disabled={submitting}
              onChange={onChange}
            />
          )}
        </Field>
      ))}

      <Actions>
        <SecondaryButton type="button" disabled={submitting} onClick={onCancel}>
          Cancel
        </SecondaryButton>
        <PrimaryButton
          type="submit"
          disabled={submitting || editableFields.length === 0}
        >
          {submitting ? "Saving..." : submitLabel}
        </PrimaryButton>
      </Actions>
    </Form>
  );
};

export default RecordForm;
