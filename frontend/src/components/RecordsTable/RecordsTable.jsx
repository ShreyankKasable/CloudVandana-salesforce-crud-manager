import { useEffect, useRef } from "react";
import EmptyState from "../EmptyState/EmptyState";
import Loader from "../Loader/Loader";

const formatValue = (value) => {
  if (value === null || value === undefined || value === "") return "-";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return String(value);
};

const RecordsTable = ({ fields, records, loading, loadingMore, hasMore, onLoadMore, onView, onEdit, onDelete }) => {
  const sentinelRef = useRef(null);

  useEffect(() => {
    if (!sentinelRef.current || !hasMore) return undefined;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading && !loadingMore) onLoadMore();
    }, { rootMargin: "240px" });
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasMore, loading, loadingMore, onLoadMore]);

  if (!loading && records.length === 0) return <EmptyState />;

  return (
    <div className="table-wrap">
      <table className="records-table">
        <thead><tr><th>Actions</th>{fields.map((field) => <th key={field.name}>{field.label || field.name}</th>)}</tr></thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.Id}>
              <td className="row-actions">
                <button type="button" className="icon-button" title="View record" onClick={() => onView(record.Id)}>View</button>
                <button type="button" className="icon-button" title="Edit record" onClick={() => onEdit(record)}>Edit</button>
                <button type="button" className="icon-button danger" title="Delete record" onClick={() => onDelete(record)}>Delete</button>
              </td>
              {fields.map((field) => <td key={field.name}>{formatValue(record[field.name])}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
      <div ref={sentinelRef} className="table-status">
        {loadingMore && <Loader label="Loading more records" />}
        {!loadingMore && hasMore && <span>Scroll to load more</span>}
        {!loadingMore && !hasMore && records.length > 0 && <span>No more records</span>}
      </div>
    </div>
  );
};

export default RecordsTable;
