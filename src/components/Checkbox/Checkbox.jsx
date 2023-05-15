import { useState } from "react";
import "./checkbox.scss";

export const Checkbox = ({ label = "" }) => {
  return (
    <label className="checkbox">
      <input type="checkbox" className="checkboxInput"/>
      <div className="box">✓</div>
      <span>Clicks</span>
    </label>
  );
};
