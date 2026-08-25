import { useEffect, useRef } from "react";
import styled from "styled-components";
import EmptyState from "../EmptyState/EmptyState";
import Loader from "../Loader/Loader";

const TableContainer = styled.div`
  overflow-x: var(--overflow-auto);
  background: var(--surface);
  border: var(--border-width) solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
`;

const Table = styled.table`
  width: var(--size-full);
  min-width: var(--layout-table-min-width);
  border-collapse: collapse;
  text-align: left;
`;

const HeaderCell = styled.th`
  padding: var(--space-row-y) var(--space-cell-x);
  color: var(--text-secondary);
  background: var(--surface-muted);
  border-bottom: var(--border-width) solid var(--border);
  font-size: var(--font-size-2xs);
  font-weight: var(--font-weight-extra-bold);
  letter-spacing: var(--letter-spacing-label);
  text-transform: uppercase;
  white-space: nowrap;
`;

const Cell = styled.td`
  max-width: var(--layout-table-cell-max);
  padding: var(--space-notice-y) var(--space-cell-x);
  color: var(--text-primary);
  border-bottom: var(--border-width) solid var(--border);
  font-size: var(--font-size-base);
  overflow-wrap: anywhere;
  vertical-align: middle;
`;

const Row = styled.tr`
  &:hover {
    background: var(--table-row-hover);
  }
`;

const ActionsCell = styled(Cell)`
  width: var(--table-actions-width);
  white-space: nowrap;
`;

const RowActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: var(--space-xs);
`;

const ActionButton = styled.button`
  min-height: var(--control-height-sm);
  padding: var(--space-none) var(--space-empty-gap);
  color: ${({ $danger }) => ($danger ? "var(--danger)" : "var(--primary)")};
  background: var(--surface);
  border: var(--border-width) solid
    ${({ $danger }) => ($danger ? "var(--danger-border)" : "var(--border-strong)")};
  border-radius: var(--radius-sm);
  font-size: var(--font-size-action);
  font-weight: var(--font-weight-extra-bold);
  cursor: pointer;

  &:hover {
    background: ${({ $danger }) =>
      $danger ? "var(--danger-soft)" : "var(--primary-soft)"};
  }

  &:focus-visible {
    outline: var(--focus-ring-width) solid var(--primary-soft);
    outline-offset: var(--focus-offset-sm);
  }
`;

const TableStatus = styled.div`
  display: flex;
  justify-content: center;
  min-height: var(--control-height-login);
  padding: var(--space-lg);
  color: var(--text-muted);
  background: var(--surface);
  font-size: var(--font-size-xs);
`;

const formatValue = (value) => {
  if (value === null || value === undefined || value === "") return "-";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return String(value);
};

const RecordsTable = ({
  fields,
  records,
  loading,
  loadingMore,
  hasMore,
  objectLabel,
  onLoadMore,
  onView,
  onEdit,
  onDelete,
}) => {
  const sentinelRef = useRef(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;

    if (!sentinel || !hasMore) return undefined;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading && !loadingMore) {
        onLoadMore();
      }
    }, {
      rootMargin: getComputedStyle(document.documentElement)
        .getPropertyValue("--infinite-scroll-root-margin")
        .trim(),
    });

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, loading, loadingMore, onLoadMore]);

  if (!loading && records.length === 0) {
    return (
      <EmptyState
        title={`No ${objectLabel || "records"} found`}
        text="Create a record or switch to another Salesforce object."
      />
    );
  }

  return (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            {fields.map((field) => (
              <HeaderCell key={field.name}>{field.label || field.name}</HeaderCell>
            ))}
            <HeaderCell>Actions</HeaderCell>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <Row key={record.Id}>
              {fields.map((field) => (
                <Cell key={field.name}>{formatValue(record[field.name])}</Cell>
              ))}
              <ActionsCell>
                <RowActions>
                  <ActionButton type="button" onClick={() => onView(record)}>
                    View
                  </ActionButton>
                  <ActionButton type="button" onClick={() => onEdit(record)}>
                    Edit
                  </ActionButton>
                  <ActionButton
                    type="button"
                    $danger
                    onClick={() => onDelete(record)}
                  >
                    Delete
                  </ActionButton>
                </RowActions>
              </ActionsCell>
            </Row>
          ))}
        </tbody>
      </Table>
      <TableStatus ref={sentinelRef}>
        {loadingMore && <Loader label="Loading more records" compact />}
        {!loadingMore && hasMore && <span>Scroll to load more</span>}
        {!loadingMore && !hasMore && records.length > 0 && <span>No more records</span>}
      </TableStatus>
    </TableContainer>
  );
};

export default RecordsTable;
