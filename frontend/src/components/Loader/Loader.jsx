import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to {
    transform: rotate(var(--rotation-full));
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-md);
  min-height: ${({ $compact }) =>
    $compact ? "var(--loader-compact-min-height)" : "var(--layout-loader-min-height)"};
  padding: ${({ $compact }) =>
    $compact
      ? "var(--space-3xs) var(--space-none)"
      : "var(--space-3xl)"};
  color: var(--text-secondary);
  font-size: var(--font-size-base);
`;

const Spinner = styled.span`
  width: var(--size-spinner);
  height: var(--size-spinner);
  border: var(--border-width-spinner) solid var(--border);
  border-top-color: var(--primary);
  border-radius: var(--radius-round);
  animation: ${spin} var(--animation-duration-fast) linear infinite;
`;

const Loader = ({ label = "Loading", compact = false }) => (
  <LoaderContainer $compact={compact} role="status" aria-live="polite">
    <Spinner aria-hidden="true" />
    <span>{label}</span>
  </LoaderContainer>
);

export default Loader;
