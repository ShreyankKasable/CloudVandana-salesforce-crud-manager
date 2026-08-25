import styled from "styled-components";

const AUTH_ERROR_CODES = new Set([
  "SALESFORCE_AUTH_REQUIRED",
  "SALESFORCE_REAUTH_REQUIRED",
]);

const Message = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--space-md);
  padding: ${({ $compact }) =>
    $compact
      ? "var(--space-sm) var(--space-md)"
      : "var(--space-md) var(--space-lg)"};
  color: var(--danger);
  background: var(--danger-soft);
  border: var(--border-width) solid var(--danger-border);
  border-left: var(--border-width-accent) solid var(--danger);
  border-radius: var(--radius-md);
`;

const Content = styled.div`
  display: grid;
  gap: var(--space-2xs);
`;

const Title = styled.strong`
  color: var(--text-primary);
  font-size: var(--font-size-md);
`;

const Body = styled.p`
  margin: 0;
  color: var(--danger-text);
  line-height: var(--line-height-body);
`;

const ActionButton = styled.button`
  min-height: var(--control-height-sm);
  padding: 0 var(--space-sm);
  color: var(--danger);
  background: var(--surface);
  border: var(--border-width) solid var(--danger-border);
  border-radius: var(--radius-md);
  font-weight: var(--font-weight-bold);
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    color: var(--text-inverse);
    background: var(--danger);
  }

  &:focus-visible {
    outline: var(--focus-ring-width) solid var(--danger-border);
    outline-offset: var(--focus-ring-offset);
  }
`;

const ErrorMessage = ({ error, onRetry, onReconnect, compact = false }) => {
  const isAuthError = AUTH_ERROR_CODES.has(error?.code);
  const actionLabel = isAuthError ? "Reconnect Salesforce" : "Retry";
  const action = isAuthError ? onReconnect : onRetry;

  return (
    <Message $compact={compact} role="alert">
      <Content>
        <Title>
          {isAuthError ? "Salesforce connection required" : "Something went wrong"}
        </Title>
        <Body>{error?.message || "Please try again."}</Body>
      </Content>
      {action && (
        <ActionButton type="button" onClick={action}>
          {actionLabel}
        </ActionButton>
      )}
    </Message>
  );
};

export default ErrorMessage;
