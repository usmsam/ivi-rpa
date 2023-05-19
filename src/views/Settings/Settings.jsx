import { useState } from "react";
import s from "./settings.module.scss";
import { Input } from "../../components/Input/Input";
export const Settings = () => {
  const [state, setstate] = useState(false);
  const [count, setcount] = useState(false);
  return (
    <div className={s.content}>
      <div className={s.fileUpload}>
        <h2>Настройки</h2>
        {/* <div className={s.cenariosSearch}>
          <input placeholder="Введите IP" />
          <button className={s.enterBtn}>
            <AiOutlineEnter />
          </button>
        </div>
        <div className={s.uploadBtn}>
          Загрузить файлы сценариев{" "}
          <GoCloudUpload className={s.GoCloudUpload} />
        </div> */}
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
      </div>
    </div>
  );
};
