const inputTypeFor = (field) => {
  if (["phone", "email", "url", "date"].includes(field.type)) return field.type === "url" ? "url" : field.type;
  if (["currency", "double", "int", "percent"].includes(field.type)) return "number";
  return "text";
};

const RecordForm = ({ fields, values, onChange, onSubmit, onCancel, submitting, mode }) => {
  const editableFields = fields.filter((field) => mode === "create" ? field.createable : field.updateable);

  return (
    <form className="record-form" onSubmit={onSubmit}>
      {editableFields.map((field) => (
        <label className="form-field" key={field.name}>
          <span>{field.label || field.name}{field.required && <em>Required</em>}</span>
          {field.type === "picklist" ? (
            <select name={field.name} value={values[field.name] ?? ""} required={field.required} onChange={onChange}>
              <option value="">Select an option</option>
              {(field.options || []).map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
          ) : field.type === "boolean" ? (
            <input type="checkbox" name={field.name} checked={Boolean(values[field.name])} onChange={onChange} />
          ) : (
            <input type={inputTypeFor(field)} name={field.name} value={values[field.name] ?? ""} required={field.required} onChange={onChange} />
          )}
        </label>
      ))}
      <div className="form-actions">
        <button type="button" className="secondary-button" onClick={onCancel}>Cancel</button>
        <button type="submit" className="primary-button" disabled={submitting}>{submitting ? "Saving..." : mode === "create" ? "Create record" : "Save changes"}</button>
      </div>
    </form>
  );
};

export default RecordForm;
