import { useEffect, useRef } from "react";
import styled from "styled-components";
import EmptyState from "../EmptyState/EmptyState";
import Loader from "../Loader/Loader";

const TableContainer = styled.div`
  overflow-x: auto;
  background: var(--surface);
  border: var(--border-width) solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xs);
`;

const Table = styled.table`
  width: 100%;
  min-width: var(--table-min-width);
  border-collapse: collapse;
  text-align: left;
`;

const HeaderCell = styled.th`
  position: sticky;
  top: 0;
  z-index: 1;
  padding: var(--space-sm) var(--space-md);
  color: var(--text-secondary);
  background: var(--surface-subtle);
  border-bottom: var(--border-width) solid var(--border);
  font-size: var(--font-size-2xs);
  font-weight: var(--font-weight-extra-bold);
  letter-spacing: var(--letter-spacing-label);
  text-transform: uppercase;
  white-space: nowrap;
`;

const Cell = styled.td`
  max-width: var(--table-cell-max-width);
  padding: var(--space-sm) var(--space-md);
  color: var(--text-primary);
  border-bottom: var(--border-width) solid var(--border);
  font-size: var(--font-size-md);
  overflow-wrap: anywhere;
  vertical-align: middle;
`;

const Row = styled.tr`
  &:nth-child(even) {
    background: var(--surface-muted);
  }

  &:hover {
    background: var(--surface-selected);
  }

  &:last-child ${Cell} {
    border-bottom: 0;
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
  padding: 0 var(--space-sm);
  color: ${({ $danger }) => ($danger ? "var(--danger)" : "var(--primary)")};
  background: ${({ $danger }) =>
    $danger ? "var(--surface)" : "var(--primary-soft)"};
  border: var(--border-width) solid
    ${({ $danger }) => ($danger ? "var(--danger-border)" : "var(--primary-border)")};
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-extra-bold);
  cursor: pointer;
  transition:
    background-color var(--transition-fast),
    border-color var(--transition-fast),
    color var(--transition-fast);

  &:hover {
    color: ${({ $danger }) => ($danger ? "var(--danger)" : "var(--primary-hover)")};
    background: ${({ $danger }) =>
      $danger ? "var(--danger-soft)" : "var(--surface-selected)"};
  }

  &:focus-visible {
    outline: var(--focus-ring-width) solid var(--primary-soft);
    outline-offset: var(--focus-ring-offset);
  }
`;

const TableStatus = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: var(--control-height-xl);
  padding: var(--space-md);
  color: var(--text-muted);
  background: var(--surface-muted);
  border-top: var(--border-width) solid var(--border);
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
      <TableContainer>
        <EmptyState
          title={`No ${objectLabel || "records"} found`}
          text="Create a record or switch to another Salesforce object."
        />
      </TableContainer>
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
