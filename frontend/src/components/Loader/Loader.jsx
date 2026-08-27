import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  min-height: ${({ $compact }) =>
    $compact ? "auto" : "var(--loader-min-height)"};
  padding: ${({ $compact }) =>
    $compact
      ? "var(--space-2xs) 0"
      : "var(--space-2xl)"};
  color: var(--text-secondary);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
`;

const Spinner = styled.span`
  width: var(--spinner-size);
  height: var(--spinner-size);
  border: var(--spinner-border-width) solid var(--surface-subtle);
  border-top-color: var(--primary);
  border-radius: var(--radius-pill);
  animation: ${spin} var(--spinner-duration) linear infinite;
`;

const Loader = ({ label = "Loading", compact = false }) => (
  <LoaderContainer $compact={compact} role="status" aria-live="polite">
    <Spinner aria-hidden="true" />
    <span>{label}</span>
  </LoaderContainer>
);

export default Loader;
