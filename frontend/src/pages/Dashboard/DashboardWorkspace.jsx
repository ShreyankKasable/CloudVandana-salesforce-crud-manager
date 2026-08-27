import styled from "styled-components";
import EmptyState from "../../components/EmptyState/EmptyState";
import Loader from "../../components/Loader/Loader";
import RecordsTable from "../../components/RecordsTable/RecordsTable";

const WorkspaceHeader = styled.section`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--space-md);
  margin-top: var(--space-xs);
`;

const WorkspaceTitle = styled.h2`
  margin: 0;
  color: var(--text-primary);
  font-size: var(--font-size-xl);
  line-height: var(--line-height-heading);
`;

const WorkspaceText = styled.p`
  margin: var(--space-2xs) 0 0;
  color: var(--text-secondary);
  line-height: var(--line-height-body);
`;

const MetaText = styled.span`
  display: inline-flex;
  align-items: center;
  min-height: var(--control-height-sm);
  padding: 0 var(--space-sm);
  color: var(--text-secondary);
  background: var(--surface);
  border: var(--border-width) solid var(--border);
  border-radius: var(--radius-pill);
  font-size: var(--font-size-sm);
`;

const StatePanel = styled.div`
  background: var(--surface);
  border: var(--border-width) solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xs);
`;

const DashboardWorkspace = ({
  objectName,
  objectLabel,
  fields,
  records,
  pagination,
  loading,
  loadingLabel,
  loadingMore,
  error,
  onLoadMore,
  onView,
  onEdit,
  onDelete,
}) => (
  <>
    <WorkspaceHeader>
      <div>
        <WorkspaceTitle>{objectLabel}</WorkspaceTitle>
        <WorkspaceText>
          View, create, update, and delete Salesforce {objectName} records.
        </WorkspaceText>
      </div>
      {!loading && (
        <MetaText>
          Page {pagination.page || 1}
          {pagination.hasMore ? " - more records available" : " - all loaded"}
        </MetaText>
      )}
    </WorkspaceHeader>

    {loading ? (
      <StatePanel>
        <Loader label={loadingLabel} />
      </StatePanel>
    ) : fields.length === 0 && !error ? (
      <StatePanel>
        <EmptyState
          title="No field metadata"
          text="Salesforce did not return fields for this object."
        />
      </StatePanel>
    ) : (
      <RecordsTable
        fields={fields}
        records={records}
        loading={loading}
        loadingMore={loadingMore}
        hasMore={pagination.hasMore}
        objectLabel={objectLabel}
        onLoadMore={onLoadMore}
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    )}
  </>
);

export default DashboardWorkspace;
