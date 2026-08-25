import { useMemo, useState } from "react";
import styled from "styled-components";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { API_URLS } from "../../config/apiUrls";
import { SALESFORCE_OBJECTS } from "../../config/salesforceObjects";
import useSalesforceRecords from "../../hooks/useSalesforceRecords";
import {
  createSalesforceRecord,
  deleteSalesforceRecord,
  getSalesforceRecordById,
  updateSalesforceRecord,
} from "../../services/salesforceApi";
import DashboardHeader from "./DashboardHeader";
import DashboardModals from "./DashboardModals";
import DashboardToolbar from "./DashboardToolbar";
import DashboardWorkspace from "./DashboardWorkspace";
import {
  buildWritablePayload,
  getWritableFields,
} from "./dashboardRecordUtils";

const Page = styled.main`
  min-height: 100svh;
  padding: var(--page-padding);
  color: var(--text-primary);
  background: var(--background);
`;

const Shell = styled.div`
  width: min(100%, var(--page-max-width));
  margin: 0 auto;
`;

const Notice = styled.div`
  margin-bottom: var(--space-md);
  padding: var(--space-md);
  color: var(--success);
  background: var(--success-soft);
  border: var(--border-width) solid var(--success-border);
  border-left: var(--border-width-accent) solid var(--success);
  border-radius: var(--radius-md);
  font-weight: var(--font-weight-bold);
`;

const ErrorStack = styled.div`
  display: grid;
  gap: var(--space-md);
  margin-bottom: var(--space-md);
`;

const Dashboard = () => {
  const [objectName, setObjectName] = useState("Account");
  const {
    fields,
    records,
    pagination,
    loading,
    metadataLoading,
    loadingMore,
    error,
    reload,
    loadMore,
  } = useSalesforceRecords(objectName);

  const [modal, setModal] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [viewRecord, setViewRecord] = useState(null);
  const [viewLoading, setViewLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [notice, setNotice] = useState("");
  const [actionError, setActionError] = useState(null);

  const currentObject = useMemo(
    () => SALESFORCE_OBJECTS.find((object) => object.name === objectName),
    [objectName],
  );

  const objectLabel = currentObject?.label || `${objectName}s`;
  const loadingLabel = metadataLoading
    ? `Loading ${objectName} metadata`
    : `Loading ${objectName} records`;

  const reconnectSalesforce = () => {
    window.location.href = API_URLS.SALESFORCE_LOGIN;
  };

  const closeModal = () => {
    setModal(null);
    setActionError(null);
    setSelectedRecord(null);
    setViewRecord(null);
    setViewLoading(false);
  };

  const handleObjectChange = (nextObjectName) => {
    setObjectName(nextObjectName);
    setNotice("");
    closeModal();
  };

  const openCreate = () => {
    setNotice("");
    setActionError(null);
    setSelectedRecord(null);
    setFormValues({});
    setModal("create");
  };

  const openEdit = (record) => {
    const values = Object.fromEntries(
      getWritableFields(fields, "edit").map((field) => [
        field.name,
        record[field.name] ?? "",
      ]),
    );

    setNotice("");
    setActionError(null);
    setSelectedRecord(record);
    setFormValues(values);
    setModal("edit");
  };

  const openView = async (record) => {
    setNotice("");
    setActionError(null);
    setSelectedRecord(record);
    setViewRecord(null);
    setModal("view");
    setViewLoading(true);

    try {
      const recordDetails = await getSalesforceRecordById(objectName, record.Id);
      setViewRecord(recordDetails.record || recordDetails);
    } catch (requestError) {
      setActionError(requestError);
    } finally {
      setViewLoading(false);
    }
  };

  const openDelete = (record) => {
    setNotice("");
    setActionError(null);
    setSelectedRecord(record);
    setModal("delete");
  };

  const handleFormChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormValues((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const submitForm = async (event) => {
    event.preventDefault();

    const operation = modal;
    const payload = buildWritablePayload({
      fields,
      values: formValues,
      mode: operation,
    });

    if (Object.keys(payload).length === 0) {
      setActionError({
        code: "EMPTY_RECORD_PAYLOAD",
        message: "Enter at least one writable field before saving.",
      });
      return;
    }

    if (operation === "edit" && !selectedRecord?.Id) {
      setActionError({
        code: "MISSING_RECORD_ID",
        message: "The selected record is missing an Id.",
      });
      return;
    }

    setSubmitting(true);
    setActionError(null);

    try {
      if (operation === "create") {
        await createSalesforceRecord(objectName, payload);
      } else {
        await updateSalesforceRecord(objectName, selectedRecord.Id, payload);
      }

      closeModal();
      setNotice(
        operation === "create"
          ? `${objectName} record created successfully.`
          : `${objectName} record updated successfully.`,
      );
      await reload();
    } catch (requestError) {
      setActionError(requestError);
    } finally {
      setSubmitting(false);
    }
  };

  const removeRecord = async () => {
    if (!selectedRecord?.Id) {
      setActionError({
        code: "MISSING_RECORD_ID",
        message: "The selected record is missing an Id.",
      });
      return;
    }

    setDeleting(true);
    setActionError(null);

    try {
      await deleteSalesforceRecord(objectName, selectedRecord.Id);
      closeModal();
      setNotice(`${objectName} record deleted successfully.`);
      await reload();
    } catch (requestError) {
      setActionError(requestError);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Page>
      <Shell>
        <DashboardHeader />
        <DashboardToolbar
          objects={SALESFORCE_OBJECTS}
          objectName={objectName}
          objectLabel={objectLabel}
          recordsLoaded={records.length}
          pageSize={pagination.pageSize}
          loading={loading}
          hasFields={fields.length > 0}
          onObjectChange={handleObjectChange}
          onCreate={openCreate}
        />

        {notice && <Notice role="status">{notice}</Notice>}

        <ErrorStack>
          {error && (
            <ErrorMessage
              error={error}
              onRetry={reload}
              onReconnect={reconnectSalesforce}
            />
          )}
        </ErrorStack>

        <DashboardWorkspace
          objectName={objectName}
          objectLabel={objectLabel}
          fields={fields}
          records={records}
          pagination={pagination}
          loading={loading}
          loadingLabel={loadingLabel}
          loadingMore={loadingMore}
          error={error}
          onLoadMore={loadMore}
          onView={openView}
          onEdit={openEdit}
          onDelete={openDelete}
        />

        <DashboardModals
          modal={modal}
          objectName={objectName}
          fields={fields}
          formValues={formValues}
          selectedRecord={selectedRecord}
          viewRecord={viewRecord}
          viewLoading={viewLoading}
          submitting={submitting}
          deleting={deleting}
          actionError={actionError}
          onClose={closeModal}
          onReconnect={reconnectSalesforce}
          onRetryView={() => selectedRecord && openView(selectedRecord)}
          onFormChange={handleFormChange}
          onFormSubmit={submitForm}
          onDeleteConfirm={removeRecord}
        />
      </Shell>
    </Page>
  );
};

export default Dashboard;
