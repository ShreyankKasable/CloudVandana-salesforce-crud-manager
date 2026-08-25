import styled from "styled-components";
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import RecordForm from "../../components/RecordForm/RecordForm";
import RecordModal from "../../components/RecordModal/RecordModal";
import RecordDetails from "./RecordDetails";
import { getRecordLabel } from "./dashboardRecordUtils";

const ModalMessage = styled.div`
  margin-bottom: var(--space-md);
`;

const DashboardModals = ({
  modal,
  objectName,
  fields,
  formValues,
  selectedRecord,
  viewRecord,
  viewLoading,
  submitting,
  deleting,
  actionError,
  onClose,
  onReconnect,
  onRetryView,
  onFormChange,
  onFormSubmit,
  onDeleteConfirm,
}) => (
  <>
    {(modal === "create" || modal === "edit") && (
      <RecordModal
        title={modal === "create" ? `Create ${objectName}` : `Edit ${objectName}`}
        onClose={onClose}
      >
        {actionError && (
          <ModalMessage>
            <ErrorMessage
              error={actionError}
              onReconnect={onReconnect}
              compact
            />
          </ModalMessage>
        )}
        <RecordForm
          fields={fields}
          values={formValues}
          mode={modal}
          submitting={submitting}
          onChange={onFormChange}
          onSubmit={onFormSubmit}
          onCancel={onClose}
        />
      </RecordModal>
    )}

    {modal === "view" && (
      <RecordModal title={`${objectName} record`} onClose={onClose}>
        {viewLoading ? (
          <Loader label={`Loading ${objectName} details`} />
        ) : actionError ? (
          <ErrorMessage
            error={actionError}
            onRetry={onRetryView}
            onReconnect={onReconnect}
            compact
          />
        ) : (
          <RecordDetails fields={fields} record={viewRecord} />
        )}
      </RecordModal>
    )}

    {modal === "delete" && (
      <ConfirmDialog
        objectName={objectName}
        recordName={getRecordLabel(selectedRecord)}
        deleting={deleting}
        error={actionError}
        onConfirm={onDeleteConfirm}
        onCancel={onClose}
        onReconnect={onReconnect}
      />
    )}
  </>
);

export default DashboardModals;
