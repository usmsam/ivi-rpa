import cn from "classnames";
import s from "./checkbox.module.scss";

export const Checkbox = ({
  label = "",
  checked = false,
  setChecked = () => {},
  className = "",
}) => {
  return (
    <label className={cn(s.checkbox, className)}>
      <input
        checked={checked}
        onChange={() => setChecked(!checked)}
        type="checkbox"
        className={s.checkboxInput}
      />
      <div className={s.box}>✓</div>
      <span>{label}</span>
    </label>
  );
};
