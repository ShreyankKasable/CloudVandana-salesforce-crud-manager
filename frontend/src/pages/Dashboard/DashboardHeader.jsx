import styled from "styled-components";

const Header = styled.header`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--space-xl);
  padding-bottom: var(--space-xl);
  border-bottom: var(--border-width) solid var(--border);
`;

const Brand = styled.p`
  margin: 0 0 var(--space-2xs);
  color: var(--primary);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-black);
  letter-spacing: var(--letter-spacing-heading);
  text-transform: uppercase;
`;

const Title = styled.h1`
  margin: 0;
  color: var(--text-primary);
  font-size: var(--font-size-page-title);
  line-height: var(--line-height-title);
`;

const ConnectionStatus = styled.div`
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  margin-top: var(--space-sm);
  color: var(--success);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-extra-bold);
`;

const StatusDot = styled.span`
  width: var(--status-dot-size);
  height: var(--status-dot-size);
  background: var(--success);
  border-radius: var(--radius-pill);
  box-shadow: 0 0 0 5px var(--success-soft);
`;

const DashboardHeader = () => (
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
);

export default DashboardHeader;
