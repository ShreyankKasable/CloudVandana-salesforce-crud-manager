import styled from "styled-components";
import { formatDisplayValue } from "./dashboardRecordUtils";

const DetailList = styled.dl`
  display: grid;
  gap: var(--space-xs);
  margin: 0;
`;

const DetailRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-md);
  padding: var(--space-sm);
  background: var(--surface-muted);
  border: var(--border-width) solid var(--border);
  border-radius: var(--radius-md);
`;

const DetailTerm = styled.dt`
  flex: 1 1 var(--detail-label-width);
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-black);
`;

const DetailValue = styled.dd`
  flex: 2 1 var(--login-column-min);
  margin: 0;
  color: var(--text-primary);
  font-size: var(--font-size-md);
  overflow-wrap: anywhere;
  line-height: var(--line-height-body);
`;

const RecordDetails = ({ fields, record }) => (
  <DetailList>
    {fields.map((field) => (
      <DetailRow key={field.name}>
        <DetailTerm>{field.label || field.name}</DetailTerm>
        <DetailValue>{formatDisplayValue(record?.[field.name])}</DetailValue>
      </DetailRow>
    ))}
  </DetailList>
);

export default RecordDetails;
