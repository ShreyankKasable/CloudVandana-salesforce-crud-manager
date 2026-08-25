const Loader = ({ label = "Loading" }) => (
  <div className="loader" role="status" aria-live="polite">
    <span className="loader-spinner" aria-hidden="true" />
    <span>{label}</span>
  </div>
);

export default Loader;
