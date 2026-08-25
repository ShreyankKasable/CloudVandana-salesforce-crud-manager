const ErrorMessage = ({ error, onRetry }) => (
  <div className="error-message" role="alert">
    <div>
      <strong>{error?.code === "SALESFORCE_AUTH_REQUIRED" || error?.code === "SALESFORCE_REAUTH_REQUIRED" ? "Salesforce connection required" : "Something went wrong"}</strong>
      <p>{error?.message || "Please try again."}</p>
    </div>
    {onRetry && <button type="button" className="text-button" onClick={onRetry}>Retry</button>}
  </div>
);

export default ErrorMessage;
