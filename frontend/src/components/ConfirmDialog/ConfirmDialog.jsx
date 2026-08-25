const ConfirmDialog = ({ recordName, deleting, onConfirm, onCancel }) => (
  <div className="modal-backdrop">
    <section className="confirm-dialog" role="alertdialog" aria-modal="true" aria-labelledby="confirm-title">
      <p className="panel-label">Permanent action</p>
      <h2 id="confirm-title">Delete this record?</h2>
      <p>Are you sure you want to delete {recordName || "this record"}? This cannot be undone.</p>
      <div className="form-actions"><button type="button" className="secondary-button" onClick={onCancel}>Cancel</button><button type="button" className="danger-button" disabled={deleting} onClick={onConfirm}>{deleting ? "Deleting..." : "Delete record"}</button></div>
    </section>
  </div>
);

export default ConfirmDialog;
