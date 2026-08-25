const EmptyState = ({ title = "No records found", text = "There is nothing to show for this object yet." }) => (
  <div className="empty-state">
    <span className="empty-state-mark" aria-hidden="true">0</span>
    <h3>{title}</h3>
    <p>{text}</p>
  </div>
);

export default EmptyState;
