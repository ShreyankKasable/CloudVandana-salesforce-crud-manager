import { useMemo, useState } from "react";
import styled from "styled-components";
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog";
import EmptyState from "../../components/EmptyState/EmptyState";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import ObjectSelector from "../../components/ObjectSelector/ObjectSelector";
import RecordForm from "../../components/RecordForm/RecordForm";
import RecordModal from "../../components/RecordModal/RecordModal";
import RecordsTable from "../../components/RecordsTable/RecordsTable";
import { API_URLS } from "../../config/apiUrls";
import { SALESFORCE_OBJECTS } from "../../config/salesforceObjects";
import useSalesforceRecords from "../../hooks/useSalesforceRecords";
import {
  createSalesforceRecord,
  deleteSalesforceRecord,
  getSalesforceRecordById,
  updateSalesforceRecord,
} from "../../services/salesforceApi";

const NUMBER_FIELD_TYPES = new Set(["currency", "double", "int", "percent"]);

const Page = styled.main`
  min-height: var(--size-page-min-height);
  padding: var(--space-page);
  color: var(--text-primary);
  background: var(--background);
`;

const Shell = styled.div`
  width: min(var(--size-full), var(--layout-dashboard-max));
  margin: var(--space-none) var(--space-auto);
`;

const Header = styled.header`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--space-2xl);
  padding-bottom: var(--space-2xl);
  border-bottom: var(--border-width) solid var(--border);
`;

const Brand = styled.p`
  margin: var(--space-none) var(--space-none) var(--space-2xs);
  color: var(--primary);
  font-size: var(--font-size-action);
  font-weight: var(--font-weight-black);
  letter-spacing: var(--letter-spacing-heading);
  text-transform: uppercase;
`;

const Title = styled.h1`
  margin: var(--space-none);
  color: var(--text-primary);
  font-size: var(--font-size-page-title);
  line-height: var(--line-height-title);
`;

const ConnectionStatus = styled.div`
  display: inline-flex;
  align-items: center;
  gap: var(--space-status-gap);
  margin-top: var(--space-row-y);
  color: var(--success);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-extra-bold);
`;

const StatusDot = styled.span`
  width: var(--size-status-dot);
  height: var(--size-status-dot);
  background: var(--success);
  border-radius: var(--radius-round);
  box-shadow: var(--shadow-status-ring);
`;

const PrimaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: var(--control-height-lg);
  padding: var(--space-none) var(--space-lg);
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
    opacity: var(--opacity-disabled);
  }

  &:focus-visible {
    outline: var(--focus-ring-width) solid var(--primary-soft);
    outline-offset: var(--focus-offset-md);
  }
`;

const Toolbar = styled.section`
  display: grid;
  grid-template-columns: var(--layout-auto-columns);
  align-items: end;
  gap: var(--space-lg);
  padding: var(--space-xl) var(--space-none);
`;

const ToolbarMeta = styled.div`
  display: grid;
  gap: var(--space-3xs);
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

const Notice = styled.div`
  margin-bottom: var(--space-lg);
  padding: var(--space-notice-y) var(--space-lg);
  color: var(--success);
  background: var(--success-soft);
  border: var(--border-width) solid var(--success-border-soft);
  border-left: var(--border-width-accent) solid var(--success);
  border-radius: var(--radius-md);
  font-weight: var(--font-weight-bold);
`;

const WorkspaceHeader = styled.section`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--space-lg);
  margin: var(--space-sm) var(--space-none) var(--space-lg);
`;

const WorkspaceTitle = styled.h2`
  margin: var(--space-none);
  color: var(--text-primary);
  font-size: var(--font-size-section-title);
`;

const WorkspaceText = styled.p`
  margin: var(--space-2xs) var(--space-none) var(--space-none);
  color: var(--text-secondary);
  line-height: var(--line-height-body);
`;

const StatePanel = styled.div`
  background: var(--surface);
  border: var(--border-width) solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
`;

const ErrorStack = styled.div`
  display: grid;
  gap: var(--space-lg);
  margin-bottom: var(--space-lg);
`;

const ModalMessage = styled.div`
  margin-bottom: var(--space-lg);
`;

const DetailList = styled.dl`
  display: grid;
  margin: var(--space-none);
`;

const DetailRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-lg);
  padding: var(--space-row-y) var(--space-none);
  border-bottom: var(--border-width) solid var(--border);

  &:last-child {
    border-bottom: var(--space-none);
  }
`;

const DetailTerm = styled.dt`
  flex: var(--layout-detail-term-ratio) var(--layout-flex-unit)
    var(--layout-detail-term-width);
  color: var(--text-secondary);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-black);
`;

const DetailValue = styled.dd`
  flex: var(--layout-detail-value-ratio) var(--layout-flex-unit)
    var(--layout-login-column-min);
  margin: var(--space-none);
  color: var(--text-primary);
  overflow-wrap: anywhere;
  line-height: var(--line-height-body-tight);
`;

const getWritableFields = (fields, mode) =>
  fields.filter((field) => (mode === "create" ? field.createable : field.updateable));

const hasFieldValue = (values, fieldName) =>
  Object.prototype.hasOwnProperty.call(values, fieldName);

const normalizePayloadValue = (field, value) => {
  if (field.type === "boolean") {
    return Boolean(value);
  }

  if (value === "" && (field.type === "date" || NUMBER_FIELD_TYPES.has(field.type))) {
    return null;
  }

  if (NUMBER_FIELD_TYPES.has(field.type)) {
    const numericValue = Number(value);
    return Number.isNaN(numericValue) ? value : numericValue;
  }

  return value;
};

const buildWritablePayload = ({ fields, values, mode }) =>
  getWritableFields(fields, mode).reduce((payload, field) => {
    if (!hasFieldValue(values, field.name)) {
      return payload;
    }

    const value = values[field.name];

    if (mode === "create" && !field.required && value === "") {
      return payload;
    }

    return {
      ...payload,
      [field.name]: normalizePayloadValue(field, value),
    };
  }, {});

const formatDisplayValue = (value) => {
  if (value === null || value === undefined || value === "") return "-";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return String(value);
};

const getRecordLabel = (record) =>
  record?.Name || record?.Subject || record?.CaseNumber || record?.Email || record?.Id;

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
    const updateableFields = getWritableFields(fields, "edit");
    const values = Object.fromEntries(
      updateableFields.map((field) => [
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

  const handleChange = (event) => {
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

  const loadingLabel = metadataLoading
    ? `Loading ${objectName} metadata`
    : `Loading ${objectName} records`;

  return (
    <Page>
      <Shell>
        <Header>
          <div>
            <Brand>CloudVandana</Brand>
            <Title>Salesforce CRUD Manager</Title>
            <ConnectionStatus>
              <StatusDot aria-hidden="true" />
              Salesforce connected
            </ConnectionStatus>
          </div>
        </Header>

        <Toolbar>
          <ObjectSelector
            objects={SALESFORCE_OBJECTS}
            value={objectName}
            onChange={handleObjectChange}
          />
          <ToolbarMeta>
            <MetaLabel>{objectLabel}</MetaLabel>
            <MetaText>
              {loading
                ? "Loading workspace"
                : `${records.length} records loaded`}
              {!loading && pagination.pageSize
                ? ` - ${pagination.pageSize} per page`
                : ""}
            </MetaText>
          </ToolbarMeta>
          <PrimaryButton
            type="button"
            disabled={loading || fields.length === 0}
            onClick={openCreate}
          >
            + Create {objectName}
          </PrimaryButton>
        </Toolbar>

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
            onLoadMore={loadMore}
            onView={openView}
            onEdit={openEdit}
            onDelete={openDelete}
          />
        )}

        {(modal === "create" || modal === "edit") && (
          <RecordModal
            title={modal === "create" ? `Create ${objectName}` : `Edit ${objectName}`}
            onClose={closeModal}
          >
            {actionError && (
              <ModalMessage>
                <ErrorMessage
                  error={actionError}
                  onReconnect={reconnectSalesforce}
                  compact
                />
              </ModalMessage>
            )}
            <RecordForm
              fields={fields}
              values={formValues}
              mode={modal}
              submitting={submitting}
              onChange={handleChange}
              onSubmit={submitForm}
              onCancel={closeModal}
            />
          </RecordModal>
        )}

        {modal === "view" && (
          <RecordModal title={`${objectName} record`} onClose={closeModal}>
            {viewLoading ? (
              <Loader label={`Loading ${objectName} details`} />
            ) : actionError ? (
              <ErrorMessage
                error={actionError}
                onRetry={() => selectedRecord && openView(selectedRecord)}
                onReconnect={reconnectSalesforce}
                compact
              />
            ) : (
              <DetailList>
                {fields.map((field) => (
                  <DetailRow key={field.name}>
                    <DetailTerm>{field.label || field.name}</DetailTerm>
                    <DetailValue>
                      {formatDisplayValue(viewRecord?.[field.name])}
                    </DetailValue>
                  </DetailRow>
                ))}
              </DetailList>
            )}
          </RecordModal>
        )}

        {modal === "delete" && (
          <ConfirmDialog
            objectName={objectName}
            recordName={getRecordLabel(selectedRecord)}
            deleting={deleting}
            error={actionError}
            onConfirm={removeRecord}
            onCancel={closeModal}
            onReconnect={reconnectSalesforce}
          />
        )}
      </Shell>
    </Page>
  );
};

export default Dashboard;
