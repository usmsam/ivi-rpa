import { useState } from "react";
import s from "./settings.module.scss";
import { Input } from "../../components/Input/Input";
import cn from "classnames";
import { Checkbox } from "../../components/Checkbox/Checkbox";
export const Settings = () => {
  const [state, setstate] = useState(false);
  const [count, setcount] = useState(false);
  const [jsScript, setJsScript] = useState("");
  const [scriptType, setScriptType] = useState("script");

  return (
    <div className={s.content}>
      <div className={s.fileUpload}>
        <h2>Настройки</h2>
      </div>
      <div className={s.content}>
        <div className={s.label}>Вся система : </div>
        <button
          className={s.editor_bottons}
          onClick={() => setstate((prev) => !prev)}
        >
          {state ? "Остановить" : "Запустить"}
        </button>
        <br />
        <br />
        <div className={s.label}>Максимальное количество браузеров : </div>
        <Input
          className={s.input}
          type={"number"}
          value={count}
          onChange={setcount}
        />
        <div className={cn(s.label, s.withRadioButtons)}>
          <span>Инжект скрипт:</span>
          <Checkbox
            label="script"
            checked={scriptType === "script"}
            setChecked={() => setScriptType("script")}
            className={s.scriptCheckbox}
          />
          <Checkbox
            label="iframe"
            checked={scriptType === "iframe"}
            setChecked={() => setScriptType("iframe")}
            className={s.scriptCheckbox}
          />
        </div>
        <Input
          placeholder="Введите скрипт..."
          value={jsScript}
          onChange={setJsScript}
          type="text"
          className={s.injectScriptInput}
        />
      </div>
    </div>
  );
};
