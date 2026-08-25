import styled from "styled-components";

const EmptyStateContainer = styled.div`
  display: grid;
  place-items: center;
  gap: var(--space-empty-gap);
  min-height: var(--layout-empty-min-height);
  padding: var(--space-3xl);
  color: var(--text-secondary);
  text-align: center;
`;

const Mark = styled.span`
  display: grid;
  place-items: center;
  width: var(--size-empty-mark);
  height: var(--size-empty-mark);
  color: var(--primary);
  background: var(--primary-soft);
  border: var(--border-width) solid var(--border);
  border-radius: var(--radius-md);
  font-weight: var(--font-weight-extra-bold);
`;

const Title = styled.h3`
  margin: var(--space-2xs) var(--space-none) var(--space-none);
  color: var(--text-primary);
  font-size: var(--font-size-empty-title);
  line-height: var(--line-height-empty-title);
`;

const Text = styled.p`
  max-width: var(--layout-empty-text-max);
  margin: var(--space-none);
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
