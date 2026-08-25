import styled from "styled-components";

const EmptyStateContainer = styled.div`
  display: grid;
  place-items: center;
  gap: var(--space-sm);
  min-height: var(--empty-min-height);
  padding: var(--space-2xl);
  color: var(--text-secondary);
  text-align: center;
`;

const Mark = styled.span`
  display: grid;
  place-items: center;
  width: var(--empty-mark-size);
  height: var(--empty-mark-size);
  color: var(--primary);
  background: var(--primary-soft);
  border: var(--border-width) solid var(--border);
  border-radius: var(--radius-md);
  font-weight: var(--font-weight-extra-bold);
`;

const Title = styled.h3`
  margin: var(--space-2xs) 0 0;
  color: var(--text-primary);
  font-size: var(--font-size-lg);
  line-height: var(--line-height-heading);
`;

const Text = styled.p`
  max-width: var(--empty-text-max-width);
  margin: 0;
  line-height: var(--line-height-copy);
`;

const EmptyState = ({
  title = "No records found",
  text = "There is nothing to show for this object yet.",
}) => (
  <EmptyStateContainer>
    <Mark aria-hidden="true">0</Mark>
    <Title>{title}</Title>
    <Text>{text}</Text>
  </EmptyStateContainer>
);

export default EmptyState;
