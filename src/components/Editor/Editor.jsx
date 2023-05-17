import cn from "classnames";
import React, { useState } from "react";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { Checkbox } from "../Checkbox/Checkbox";
import { Input } from "../Input/Input";

import s from "./editor.module.scss";
import { MultiSelect } from "../MultiSelect/MultiSelect";
import { postScenarios } from "../../shared/api/routes/scenarios";

export const Editor = ({ isActive = false, setIsActive = () => {} }) => {
  const [value, onChange] = useState("10:00");
  const [checked, setChecked] = useState(false);
  const options = [
    { value: "0", label: "Chocolate" },
    { value: "1", label: "Strawberry" },
    { value: "2", label: "Vanilla" },
  ];

  const onSubmit = () => {
    try {
      const getScenariosdt = async () => {
        const data = await postScenarios();
        console.log(data);
      };
      getScenariosdt();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className={cn(s.editor, { [s.active]: isActive })}
      onClick={() => setIsActive(!isActive)}
    >
      <div className={s.editorWrapper} onClick={(e) => e.stopPropagation()}>
        <div className={s.title}>Scenario Editor</div>
        <Input
          label="Scenario Name:"
          subtitle="Enter scenario name."
          placeholder="Enter name"
        />
        <div className={s.label}>Frame URLs:</div>
        <MultiSelect options={options} />

        <Input
          label="Time to Live (sec):"
          subtitle="Enter TTL"
          placeholder="Enter time to live in seconds."
        />
        <Input label="Width:" placeholder="Enter width" />
        <Input label="Height:" placeholder="Enter height" />

        <div className={s.label}>Backlist:</div>
        <MultiSelect options={options} />
        <Checkbox label="Clicks" checked={checked} setChecked={setChecked} />
        {checked && (
          <>
            <Input
              label="Click Probability:"
              subtitle="Enter click probability"
              placeholder="Enter click probability as s decimal between 0 and 1."
            />
            <Input
              label="Time to Live After Click (sec):"
              subtitle="Enter TTL after click"
              placeholder="Enter time to live after click in seconds."
            />
          </>
        )}
        <div className={s.label}>Work Time</div>
        <TimePicker
          onChange={onChange}
          value={value}
          maxTime="23:59"
          disableClock
          className={s.timepicker}
        />
        <div className={s.label}>Tags</div>
        <MultiSelect options={options} />
        <div className={s.editor_bottons}>
          <button
            className={cn(s.editor_bottons, s.default)}
            onClick={onSubmit}
          >
            Save
          </button>
          <button className={cn(s.editor_bottons, s.dashed)}>Reset</button>
        </div>
      </div>
    </div>
  );
};
