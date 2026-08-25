import { useState } from "react";
import { SALESFORCE_OBJECTS } from "../../config/salesforceObjects";
import useSalesforceRecords from "../../hooks/useSalesforceRecords";
import { createSalesforceRecord, deleteSalesforceRecord, getSalesforceRecordById, updateSalesforceRecord } from "../../services/salesforceApi";
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog";
import EmptyState from "../../components/EmptyState/EmptyState";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import ObjectSelector from "../../components/ObjectSelector/ObjectSelector";
import RecordForm from "../../components/RecordForm/RecordForm";
import RecordModal from "../../components/RecordModal/RecordModal";
import RecordsTable from "../../components/RecordsTable/RecordsTable";
import "./Dashboard.css";

const Dashboard = () => {
  const [objectName, setObjectName] = useState("Account");
  const { fields, records, pagination, loading, loadingMore, error, reload, loadMore } = useSalesforceRecords(objectName);
  const [modal, setModal] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [selectedRecord, setSelectedRecord] = useState(null);

  const openCreate = () => { setFeedback(""); setFormValues({}); setModal("create"); };
  const openEdit = (record) => { setFeedback(""); setFormValues(Object.fromEntries(fields.map((field) => [field.name, record[field.name] ?? ""]))); setSelectedRecord(record); setModal("edit"); };
  const openView = async (recordId) => { setSubmitting(true); try { setSelectedRecord(await getSalesforceRecordById(objectName, recordId)); setModal("view"); } catch (requestError) { setFeedback(requestError.message); } finally { setSubmitting(false); } };
  const submitForm = async (event) => {
    event.preventDefault(); setSubmitting(true); setFeedback("");
    try { if (modal === "create") await createSalesforceRecord(objectName, formValues); else await updateSalesforceRecord(objectName, selectedRecord.Id, formValues); setModal(null); setFeedback(modal === "create" ? "Record created successfully." : "Record updated successfully."); await reload(); } catch (requestError) { setFeedback(requestError.message); } finally { setSubmitting(false); }
  };
  const removeRecord = async () => { setSubmitting(true); try { await deleteSalesforceRecord(objectName, selectedRecord.Id); setModal(null); setFeedback("Record deleted successfully."); await reload(); } catch (requestError) { setFeedback(requestError.message); } finally { setSubmitting(false); } };
  const handleChange = (event) => { const { name, value, type, checked } = event.target; setFormValues((current) => ({ ...current, [name]: type === "checkbox" ? checked : value })); };

  return (
    <main className="dashboard-page">
      <header className="dashboard-header"><div><p className="dashboard-eyebrow">CloudVandana / operations</p><h1>Salesforce workspace</h1></div><button type="button" className="primary-button header-action" onClick={openCreate}>+ Create record</button></header>
      <section className="dashboard-toolbar"><ObjectSelector objects={SALESFORCE_OBJECTS} value={objectName} onChange={setObjectName} /><div className="record-count">{loading ? "Loading workspace" : `${records.length} records loaded`}</div></section>
      {feedback && <div className="feedback" role="status">{feedback}</div>}
      {error && <ErrorMessage error={error} onRetry={reload} />}
      {loading ? <Loader label={`Loading ${objectName.toLowerCase()}`} /> : <RecordsTable fields={fields} records={records} loading={loading} loadingMore={loadingMore} hasMore={pagination.hasMore} onLoadMore={loadMore} onView={openView} onEdit={openEdit} onDelete={(record) => { setSelectedRecord(record); setModal("delete"); }} />}
      {!loading && fields.length === 0 && records.length === 0 && !error && <EmptyState title="No field metadata" text="Salesforce did not return fields for this object." />}
      {modal === "create" || modal === "edit" ? <RecordModal title={modal === "create" ? `Create ${objectName}` : `Edit ${objectName}`} onClose={() => setModal(null)}><RecordForm fields={fields} values={formValues} onChange={handleChange} onSubmit={submitForm} onCancel={() => setModal(null)} submitting={submitting} mode={modal} /></RecordModal> : null}
      {modal === "view" ? <RecordModal title={`${objectName} record`} onClose={() => setModal(null)}><div className="detail-list">{fields.map((field) => <div key={field.name}><dt>{field.label || field.name}</dt><dd>{selectedRecord?.record?.[field.name] ?? selectedRecord?.[field.name] ?? "-"}</dd></div>)}</div></RecordModal> : null}
      {modal === "delete" ? <ConfirmDialog recordName={selectedRecord?.Name || selectedRecord?.Subject} deleting={submitting} onConfirm={removeRecord} onCancel={() => setModal(null)} /> : null}
    </main>
  );
};

export default Dashboard;
