import styled from "styled-components";
import ObjectSelector from "../../components/ObjectSelector/ObjectSelector";

const Toolbar = styled.section`
  display: grid;
  grid-template-columns: minmax(var(--toolbar-column-min), auto) 1fr auto;
  align-items: center;
  gap: var(--space-lg);
  padding: var(--space-lg);
  background: var(--surface);
  border: var(--border-width) solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xs);

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    align-items: stretch;
  }
`;

const ToolbarMeta = styled.div`
  display: grid;
  gap: var(--space-2xs);
  justify-self: start;
`;

const MetaLabel = styled.span`
  color: var(--text-primary);
  font-weight: var(--font-weight-extra-bold);
`;

const MetaText = styled.span`
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
`;

const PrimaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  justify-self: end;
  min-height: var(--control-height-lg);
  padding: 0 var(--space-md);
  color: var(--text-inverse);
  background: var(--primary);
  border-radius: var(--radius-md);
  font-weight: var(--font-weight-black);
  white-space: nowrap;
  cursor: pointer;
  transition:
    background-color var(--transition-fast),
    opacity var(--transition-fast);

  &:hover:not(:disabled) {
    background: var(--primary-hover);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: var(--disabled-opacity);
  }

  &:focus-visible {
    outline: var(--focus-ring-width) solid var(--primary-soft);
    outline-offset: var(--focus-ring-offset-lg);
  }

  @media (max-width: 760px) {
    width: 100%;
    justify-self: stretch;
  }
`;

const DashboardToolbar = ({
  objects,
  objectName,
  objectLabel,
  recordsLoaded,
  pageSize,
  loading,
  hasFields,
  onObjectChange,
  onCreate,
}) => (
  <Toolbar>
    <ObjectSelector objects={objects} value={objectName} onChange={onObjectChange} />
    <ToolbarMeta>
      <MetaLabel>{objectLabel}</MetaLabel>
      <MetaText>
        {loading ? "Loading workspace" : `${recordsLoaded} records loaded`}
        {!loading && pageSize ? ` - ${pageSize} per page` : ""}
      </MetaText>
    </ToolbarMeta>
    <PrimaryButton type="button" disabled={loading || !hasFields} onClick={onCreate}>
      + Create {objectName}
    </PrimaryButton>
  </Toolbar>
);

export default DashboardToolbar;
