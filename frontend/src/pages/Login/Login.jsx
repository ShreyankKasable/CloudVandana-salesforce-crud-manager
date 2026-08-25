import { API_URLS } from "../../config/apiUrls";
import "./Login.css";

const Login = () => (
  <main className="login-shell">
    <section className="login-intro" aria-labelledby="login-title">
      <div className="eyebrow">CloudVandana / workspace</div>
      <div className="intro-copy">
        <p className="kicker">Salesforce operations, kept clear.</p>
        <h1 id="login-title">Salesforce CRUD Manager</h1>
        <p className="intro-text">Connect your Salesforce org to view, create, update, and manage records from one focused workspace.</p>
      </div>
      <div className="intro-footer"><span className="status-dot" aria-hidden="true" />Secure OAuth connection</div>
    </section>
    <section className="login-panel" aria-label="Salesforce login">
      <div className="panel-mark" aria-hidden="true">SF</div>
      <p className="panel-label">Welcome back</p>
      <h2>Sign in to continue</h2>
      <p className="panel-text">Use your Salesforce account to open your organization workspace.</p>
      <button type="button" className="salesforce-button" onClick={() => { window.location.href = API_URLS.SALESFORCE_LOGIN; }}><span className="button-symbol" aria-hidden="true">S</span><span>Login with Salesforce</span><span className="button-arrow" aria-hidden="true">-&gt;</span></button>
      <p className="privacy-note">Your credentials stay with Salesforce.</p>
    </section>
  </main>
);

export default Login;
