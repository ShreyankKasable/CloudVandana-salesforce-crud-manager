import styled from "styled-components";

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--space-lg);
  padding: var(--space-xl);
  background: var(--surface);
  border: var(--border-width) solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xs);
`;

const Brand = styled.p`
  margin: 0 0 var(--space-xs);
  color: var(--primary);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-extra-bold);
  letter-spacing: var(--letter-spacing-heading);
  text-transform: uppercase;
`;

const Title = styled.h1`
  margin: 0;
  color: var(--text-primary);
  font-size: var(--font-size-page-title);
  line-height: var(--line-height-title);
`;

const Subtitle = styled.p`
  max-width: var(--dashboard-subtitle-width);
  margin: var(--space-xs) 0 0;
  color: var(--text-secondary);
  font-size: var(--font-size-md);
  line-height: var(--line-height-body);
`;

const ConnectionStatus = styled.div`
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  min-height: var(--control-height-sm);
  padding: 0 var(--space-sm);
  color: var(--success);
  background: var(--success-soft);
  border: var(--border-width) solid var(--success-border);
  border-radius: var(--radius-pill);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-extra-bold);
  white-space: nowrap;
`;

const StatusDot = styled.span`
  width: var(--status-dot-size);
  height: var(--status-dot-size);
  background: var(--success);
  border-radius: var(--radius-pill);
  box-shadow: var(--status-ring);
`;

const DashboardHeader = () => (
  <Header>
    <div>
      <Brand>Salesforce Workspace</Brand>
      <Title>Salesforce CRUD Manager</Title>
      <Subtitle>
        Internal CRM workspace for managing Salesforce records across core
        business objects.
      </Subtitle>
    </div>
    <ConnectionStatus>
      <StatusDot aria-hidden="true" />
      Salesforce Connected
    </ConnectionStatus>
  </Header>
);

export default DashboardHeader;
