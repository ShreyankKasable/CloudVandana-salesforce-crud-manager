import styled from "styled-components";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const Backdrop = styled.div`
  position: fixed;
  inset: var(--inset-fill);
  z-index: var(--z-modal);
  display: grid;
  place-items: center;
  padding: var(--space-xl);
  background: var(--overlay);
`;

const Dialog = styled.section`
  display: grid;
  gap: var(--space-lg);
  width: min(var(--size-full), var(--layout-dialog-width));
  padding: var(--space-modal);
  background: var(--surface);
  border: var(--border-width) solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
`;

const Label = styled.p`
  margin: var(--space-none);
  color: var(--danger);
  font-size: var(--font-size-2xs);
  font-weight: var(--font-weight-extra-bold);
  letter-spacing: var(--letter-spacing-label);
  text-transform: uppercase;
`;

const Title = styled.h2`
  margin: var(--space-none);
  color: var(--text-primary);
  font-size: var(--font-size-dialog-title);
  line-height: var(--line-height-heading);
`;

const Message = styled.p`
  margin: var(--space-none);
  color: var(--text-secondary);
  line-height: var(--line-height-copy);
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: var(--space-md);
  margin-top: var(--space-sm);
`;

const SecondaryButton = styled.button`
  min-height: var(--control-height-md);
  padding: var(--space-none) var(--space-lg);
  color: var(--text-primary);
  background: var(--surface);
  border: var(--border-width) solid var(--border-strong);
  border-radius: var(--radius-md);
  font-weight: var(--font-weight-bold);
  cursor: pointer;

  &:hover:not(:disabled) {
    background: var(--surface-muted);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: var(--opacity-disabled-strong);
  }
`;

const DangerButton = styled.button`
  min-height: var(--control-height-md);
  padding: var(--space-none) var(--space-lg);
  color: var(--text-inverse);
  background: var(--danger);
  border-radius: var(--radius-md);
  font-weight: var(--font-weight-extra-bold);
  cursor: pointer;

  &:hover:not(:disabled) {
    background: var(--danger-hover);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: var(--opacity-disabled-strong);
  }
`;

const ConfirmDialog = ({
  objectName,
  recordName,
  deleting,
  error,
  onConfirm,
  onCancel,
  onReconnect,
}) => (
  <Backdrop>
    <Dialog role="alertdialog" aria-modal="true" aria-labelledby="confirm-title">
      <Label>Permanent action</Label>
      <Title id="confirm-title">Delete {objectName} record?</Title>
      <Message>
        Are you sure you want to delete this {objectName} record
        {recordName ? ` (${recordName})` : ""}? This cannot be undone.
      </Message>
      {error && (
        <ErrorMessage error={error} onReconnect={onReconnect} compact />
      )}
      <Actions>
        <SecondaryButton type="button" disabled={deleting} onClick={onCancel}>
          Cancel
        </SecondaryButton>
        <DangerButton type="button" disabled={deleting} onClick={onConfirm}>
          {deleting ? "Deleting..." : "Delete record"}
        </DangerButton>
      </Actions>
    </Dialog>
  </Backdrop>
);

export default ConfirmDialog;
