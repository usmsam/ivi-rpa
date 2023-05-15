import cn from "classnames";

import { Checkbox } from "../Checkbox/Checkbox";
import { Input } from "../Input/Input";

import s from "./editor.module.scss";

export const Editor = ({ isActive = false, setIsActive = () => {} }) => {
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
        <Input
          label="Frame URLs:"
          subtitle="Enter frame URLs"
          placeholder="Enter frame URL’s separated by commas."
        />
        <Input
          label="Time to Live (sec):"
          subtitle="Enter TTL"
          placeholder="Enter time to live in seconds."
        />
        <Input label="Width:" placeholder="Enter width" />
        <Input label="Height:" placeholder="Enter height" />
        <Input
          label="Backlist:"
          subtitle="Enter backlist URLs"
          placeholder="Enter backlist URLs separated by commas."
        />
        <Checkbox label="Clicks" />
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
        <div className={s.editor_bottons}>
          <button className={s.editor_bottons, s.default}>Save</button>
          <button className={s.editor_bottonss,.dashed}>Reset</button>
        </div>
      </div>
    </div>
  );
};
