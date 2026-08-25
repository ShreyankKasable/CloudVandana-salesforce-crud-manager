import styled from "styled-components";
import ObjectSelector from "../../components/ObjectSelector/ObjectSelector";

const Toolbar = styled.section`
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(min(100%, var(--login-column-min)), 1fr)
  );
  align-items: end;
  gap: var(--space-md);
  padding: var(--space-lg) 0;
`;

const ToolbarMeta = styled.div`
  display: grid;
  gap: var(--space-2xs);
  justify-self: start;
`;

const MetaLabel = styled.span`
  color: var(--text-primary);
  font-weight: var(--font-weight-black);
`;

const MetaText = styled.span`
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
`;

const PrimaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: var(--control-height-lg);
  padding: 0 var(--space-md);
  color: var(--text-inverse);
  background: var(--primary);
  border-radius: var(--radius-md);
  font-weight: var(--font-weight-black);
  white-space: nowrap;
  cursor: pointer;

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
