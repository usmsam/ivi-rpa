import cn from "classnames";

import { Checkbox } from "../Checkbox/Checkbox";
import { Input } from "../Input/Input";

import "./editor.scss";

export const Editor = ({ isActive = false, setIsActive = () => {} }) => {
  return (
    <div
      className={cn("editor", { ["active"]: isActive })}
      onClick={() => setIsActive(!isActive)}
    >
      <div className="editorWrapper" onClick={(e) => e.stopPropagation()}>
        <div className="title">Scenario Editor</div>
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
        <div className="editor_bottons">
          <button className="editor_bottons-default">Save</button>
          <button className="editor_bottons-dashed">Reset</button>
        </div>
      </div>
    </div>
  );
};
