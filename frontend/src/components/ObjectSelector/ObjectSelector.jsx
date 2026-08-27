import styled from "styled-components";

const Field = styled.label`
  display: grid;
  gap: var(--space-2xs);
  color: var(--text-secondary);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
`;

const LabelText = styled.span`
  letter-spacing: var(--letter-spacing-label);
  text-transform: uppercase;
`;

const Select = styled.select`
  width: min(100%, var(--selector-width));
  min-height: var(--control-height-lg);
  padding: 0 var(--space-2xl) 0 var(--space-sm);
  color: var(--text-primary);
  background: var(--surface);
  border: var(--border-width) solid var(--border-strong);
  border-radius: var(--radius-md);
  font-weight: var(--font-weight-bold);
  cursor: pointer;
  transition:
    border-color var(--transition-fast),
    box-shadow var(--transition-fast);

  &:hover {
    border-color: var(--primary-border);
  }

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
