import "./checkbox.scss";

export const Checkbox = ({
  label = "",
  checked = false,
  setChecked = () => {},
}) => {
  return (
    <label className="checkbox">
      <input
        checked={checked}
        onChange={() => setChecked(!checked)}
        type="checkbox"
        className="checkboxInput"
      />
      <div className="box">✓</div>
      <span>{label}</span>
    </label>
  );
};
