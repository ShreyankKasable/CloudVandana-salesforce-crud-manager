const ObjectSelector = ({ objects, value, onChange }) => (
  <label className="object-selector">
    <span>Working with</span>
    <select value={value} onChange={(event) => onChange(event.target.value)}>
      {objects.map((object) => (
        <option key={object.name} value={object.name}>{object.label}</option>
      ))}
    </select>
  </label>
);

export default ObjectSelector;
