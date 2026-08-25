import styled from "styled-components";

const Field = styled.label`
  display: grid;
  gap: var(--space-xs);
  color: var(--text-secondary);
  font-size: var(--font-size-action);
  font-weight: var(--font-weight-bold);
`;

const LabelText = styled.span`
  letter-spacing: var(--letter-spacing-label);
  text-transform: uppercase;
`;

const Select = styled.select`
  width: min(var(--size-full), var(--layout-selector-width));
  min-height: var(--control-height-lg);
  padding: var(--space-none) var(--size-empty-mark) var(--space-none) var(--space-md);
  color: var(--text-primary);
  background: var(--surface);
  border: var(--border-width) solid var(--border-strong);
  border-radius: var(--radius-md);
  cursor: pointer;

  &:focus {
    border-color: var(--primary);
    outline: var(--focus-ring-width) solid var(--primary-soft);
  }
`;

const ObjectSelector = ({ objects, value, onChange }) => (
  <Field>
    <LabelText>Salesforce Object</LabelText>
    <Select value={value} onChange={(event) => onChange(event.target.value)}>
      {objects.map((object) => (
        <option key={object.name} value={object.name}>
          {object.label}
        </option>
      ))}
    </Select>
  </Field>
);

export default ObjectSelector;
