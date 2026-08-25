import styled from "styled-components";
import { API_URLS } from "../../config/apiUrls";

const Shell = styled.main`
  min-height: var(--size-page-min-height);
  display: grid;
  grid-template-columns: var(--layout-auto-columns);
  background: var(--background);
`;

const Intro = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: var(--layout-login-intro-min-height);
  padding: var(--space-login-panel);
  color: var(--text-inverse);
  background:
    linear-gradient(var(--hero-scrim), var(--hero-scrim)),
    var(--hero-gradient);
`;

const Eyebrow = styled.p`
  margin: var(--space-none);
  color: var(--hero-text-muted);
  font-size: var(--font-size-eyebrow);
  font-weight: var(--font-weight-extra-bold);
  letter-spacing: var(--letter-spacing-heading);
  text-transform: uppercase;
`;

const IntroCopy = styled.div`
  display: grid;
  gap: var(--space-login-copy-gap);
  max-width: var(--layout-login-copy-max);
`;

const Kicker = styled.p`
  margin: var(--space-none);
  color: var(--hero-accent);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-extra-bold);
  letter-spacing: var(--letter-spacing-label);
  text-transform: uppercase;
`;

const Title = styled.h1`
  max-width: var(--layout-login-title-max);
  margin: var(--space-none);
  font-size: var(--font-size-login-title);
  line-height: var(--line-height-display);
`;

const IntroText = styled.p`
  max-width: var(--layout-login-text-max);
  margin: var(--space-none);
  color: var(--hero-text-secondary);
  font-size: var(--font-size-md);
  line-height: var(--line-height-hero);
`;

const IntroFooter = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-empty-gap);
  color: var(--hero-text-muted);
  font-size: var(--font-size-form);
`;

const StatusDot = styled.span`
  width: var(--size-status-dot);
  height: var(--size-status-dot);
  background: var(--status-dot-login);
  border-radius: var(--radius-round);
  box-shadow: var(--shadow-login-status-ring);
`;

const Panel = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: var(--space-login-panel);
  background: var(--surface);
  border-left: var(--border-width) solid var(--border);
`;

const PanelMark = styled.div`
  display: grid;
  place-items: center;
  width: var(--size-panel-mark);
  height: var(--size-panel-mark);
  margin-bottom: var(--space-4xl);
  color: var(--text-inverse);
  background: var(--primary);
  border-radius: var(--radius-md);
  font-weight: var(--font-weight-black);
`;

const PanelLabel = styled.p`
  margin: var(--space-none) var(--space-none) var(--space-md);
  color: var(--primary);
  font-size: var(--font-size-label);
  font-weight: var(--font-weight-extra-bold);
  letter-spacing: var(--letter-spacing-heading);
  text-transform: uppercase;
`;

const PanelTitle = styled.h2`
  margin: var(--space-none);
  color: var(--text-primary);
  font-size: var(--font-size-login-panel-title);
  line-height: var(--line-height-title);
`;

const PanelText = styled.p`
  max-width: var(--layout-login-panel-text-max);
  margin: var(--space-lg) var(--space-none) var(--space-3xl);
  color: var(--text-secondary);
  line-height: var(--line-height-loose);
`;

const SalesforceButton = styled.button`
  display: flex;
  align-items: center;
  gap: var(--space-button-gap);
  width: min(var(--size-full), var(--layout-login-panel-text-max));
  min-height: var(--control-height-login);
  padding: var(--space-none) var(--space-lg);
  color: var(--text-inverse);
  background: var(--primary);
  border-radius: var(--radius-md);
  font-weight: var(--font-weight-extra-bold);
  cursor: pointer;

  &:hover {
    background: var(--primary-hover);
  }

  &:focus-visible {
    outline: var(--focus-ring-width) solid var(--primary-soft);
    outline-offset: var(--focus-offset-md);
  }
`;

const ButtonSymbol = styled.span`
  display: grid;
  place-items: center;
  width: var(--size-button-symbol);
  height: var(--size-button-symbol);
  color: var(--primary);
  background: var(--text-inverse);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
`;

const ButtonArrow = styled.span`
  margin-left: var(--space-auto);
  font-size: var(--font-size-icon);
`;

const PrivacyNote = styled.p`
  margin: var(--space-lg) var(--space-none) var(--space-none);
  color: var(--text-muted);
  font-size: var(--font-size-note);
`;

const redirectToSalesforce = () => {
  window.location.href = API_URLS.SALESFORCE_LOGIN;
};

const Login = () => (
  <Shell>
        <Intro aria-labelledby="login-title">
        <Eyebrow>CloudVandana / workspace</Eyebrow>
        <IntroCopy>
            <Kicker>Salesforce operations, kept clear.</Kicker>
            <Title id="login-title">Salesforce CRUD Manager</Title>
            <IntroText>
            Connect your Salesforce org to view, create, update, and manage
            records from one focused workspace.
            </IntroText>
        </IntroCopy>
        <IntroFooter>
            <StatusDot aria-hidden="true" />
            Secure OAuth connection
        </IntroFooter>
        </Intro>
        <Panel aria-label="Salesforce login">
        <PanelMark aria-hidden="true">SF</PanelMark>
        <PanelLabel>Welcome back</PanelLabel>
        <PanelTitle>Sign in to continue</PanelTitle>
        <PanelText>
            Use your Salesforce account to open your organization workspace.
        </PanelText>
        <SalesforceButton type="button" onClick={redirectToSalesforce}>
            <ButtonSymbol aria-hidden="true">S</ButtonSymbol>
            <span>Login with Salesforce</span>
            <ButtonArrow aria-hidden="true">-&gt;</ButtonArrow>
        </SalesforceButton>
        <PrivacyNote>Your credentials stay with Salesforce.</PrivacyNote>
        </Panel>
    </Shell>
);

export default Login;
