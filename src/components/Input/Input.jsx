import cn from "classnames";

import s from "./input.module.scss";

export const Input = ({
  label = "",
  subtitle = "",
  value = "",
  type = "text",
  onChange = () => {},
  placeholder = " ",
  className = "",
  min = 0,
  max,
  step = 1,
}) => {
  return (
    <div className={cn(s.inputWrapper, className)}>
      <div className={s.label}>{label}</div>
      <input
        placeholder={placeholder}
        type={type}
        onChange={(e) => onChange(e.target.value)}
        value={value}
        className={s.input}
        min={min}
        max={max}
        step={step}
      />
      <span className={s.subtitle}> {subtitle}</span>
    </div>
  );
};
