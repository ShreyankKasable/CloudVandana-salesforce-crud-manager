import styled from "styled-components";
import { API_URLS } from "../../config/apiUrls";

const Shell = styled.main`
  min-height: 100svh;
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(min(100%, var(--login-column-min)), 1fr)
  );
  background: var(--background);
`;

const Intro = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: var(--login-intro-min-height);
  padding: var(--panel-padding);
  color: var(--text-inverse);
  background:
    linear-gradient(var(--hero-scrim), var(--hero-scrim)),
    var(--hero-gradient);
`;

const Eyebrow = styled.p`
  margin: 0;
  color: var(--hero-text-muted);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-extra-bold);
  letter-spacing: var(--letter-spacing-heading);
  text-transform: uppercase;
`;

const IntroCopy = styled.div`
  display: grid;
  gap: var(--space-lg);
  max-width: var(--login-content-max-width);
`;

const Kicker = styled.p`
  margin: 0;
  color: var(--hero-accent);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-extra-bold);
  letter-spacing: var(--letter-spacing-label);
  text-transform: uppercase;
`;

const Title = styled.h1`
  max-width: var(--login-title-max-width);
  margin: 0;
  font-size: var(--font-size-display);
  line-height: var(--line-height-display);
`;

const IntroText = styled.p`
  max-width: var(--login-text-max-width);
  margin: 0;
  color: var(--hero-text-secondary);
  font-size: var(--font-size-md);
  line-height: var(--line-height-hero);
`;

const IntroFooter = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  color: var(--hero-text-muted);
  font-size: var(--font-size-sm);
`;

const StatusDot = styled.span`
  width: var(--status-dot-size);
  height: var(--status-dot-size);
  background: var(--status-online);
  border-radius: var(--radius-pill);
  box-shadow: 0 0 0 5px var(--success-soft);
`;

const Panel = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: var(--panel-padding);
  background: var(--surface);
  border-left: var(--border-width) solid var(--border);
`;

const PanelMark = styled.div`
  display: grid;
  place-items: center;
  width: var(--brand-mark-size);
  height: var(--brand-mark-size);
  margin-bottom: var(--space-3xl);
  color: var(--text-inverse);
  background: var(--primary);
  border-radius: var(--radius-md);
  font-weight: var(--font-weight-black);
`;

const PanelLabel = styled.p`
  margin: 0 0 var(--space-sm);
  color: var(--primary);
  font-size: var(--font-size-2xs);
  font-weight: var(--font-weight-extra-bold);
  letter-spacing: var(--letter-spacing-heading);
  text-transform: uppercase;
`;

const PanelTitle = styled.h2`
  margin: 0;
  color: var(--text-primary);
  font-size: var(--font-size-panel-title);
  line-height: var(--line-height-title);
`;

const PanelText = styled.p`
  max-width: var(--login-column-min);
  margin: var(--space-md) 0 var(--space-2xl);
  color: var(--text-secondary);
  line-height: var(--line-height-loose);
`;

const SalesforceButton = styled.button`
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  width: min(100%, var(--login-column-min));
  min-height: var(--control-height-xl);
  padding: 0 var(--space-md);
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
    outline-offset: var(--focus-ring-offset-lg);
  }
`;

const ButtonSymbol = styled.span`
  display: grid;
  place-items: center;
  width: var(--button-symbol-size);
  height: var(--button-symbol-size);
  color: var(--primary);
  background: var(--text-inverse);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
`;

const ButtonArrow = styled.span`
  margin-left: auto;
  font-size: var(--font-size-lg);
`;

const PrivacyNote = styled.p`
  margin: var(--space-md) 0 0;
  color: var(--text-muted);
  font-size: var(--font-size-xs);
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
