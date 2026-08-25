import { useEffect } from "react";
import styled from "styled-components";

const Backdrop = styled.div`
  position: fixed;
  inset: var(--inset-fill);
  z-index: var(--z-modal);
  display: grid;
  place-items: center;
  padding: var(--space-xl);
  background: var(--overlay);
`;

const ModalContainer = styled.section`
  width: min(var(--size-full), var(--layout-modal-width));
  max-height: var(--layout-modal-max-height);
  overflow: var(--overflow-auto);
  padding: var(--space-modal);
  background: var(--surface);
  border: var(--border-width) solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-lg);
  padding-bottom: var(--space-xl);
  border-bottom: var(--border-width) solid var(--border);
  margin-bottom: var(--space-xl);
`;

const Title = styled.h2`
  margin: var(--space-none);
  color: var(--text-primary);
  font-size: var(--font-size-modal-title);
  line-height: var(--line-height-heading);
`;

const CloseButton = styled.button`
  display: grid;
  flex: var(--layout-flex-fixed);
  place-items: center;
  width: var(--size-close-button);
  height: var(--size-close-button);
  color: var(--text-secondary);
  background: var(--background-transparent);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-close);
  line-height: var(--line-height-tight);
  cursor: pointer;

  &:hover {
    color: var(--text-primary);
    background: var(--surface-muted);
  }

  &:focus-visible {
    outline: var(--focus-ring-width) solid var(--primary-soft);
    outline-offset: var(--focus-offset-sm);
  }
`;

const RecordModal = ({ title, children, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <Backdrop
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <ModalContainer role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <Header>
          <Title id="modal-title">{title}</Title>
          <CloseButton type="button" aria-label="Close" onClick={onClose}>
            x
          </CloseButton>
        </Header>
        {children}
      </ModalContainer>
    </Backdrop>
  );
};

export default RecordModal;
