const RecordModal = ({ title, children, onClose }) => (
  <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-header"><h2 id="modal-title">{title}</h2><button type="button" className="close-button" aria-label="Close" onClick={onClose}>x</button></div>
      {children}
    </section>
  </div>
);

export default RecordModal;
