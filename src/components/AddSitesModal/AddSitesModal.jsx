import cn from "classnames";
import React, { useState } from "react";
import { Input } from "../Input/Input";

import s from "./addSitesModal.module.scss";

export const AddSitesModal = ({ isActive = false, setIsActive = () => {} }) => {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [selector, setSelector] = useState("");

  const onSubmit = () => {
    setIsActive(false);
  };
  return (
    <div
      className={cn(s.editor, { [s.active]: isActive })}
      onClick={() => setIsActive(!isActive)}
    >
      <div className={s.editorWrapper} onClick={(e) => e.stopPropagation()}>
        <div className={s.title}>Добавление сайта</div>
        <Input
          label="Название:"
          placeholder="Введите название..."
          onChange={setName}
          value={name}
        />
        <Input
          label="Ссылка:"
          placeholder="Введите ссылку..."
          onChange={setLink}
          value={link}
        />
        <Input
          label="Css-селектор:"
          placeholder="Введите селектор..."
          onChange={setSelector}
          value={selector}
        />

        <div className={s.editor_bottons}>
          <button
            className={cn(s.editor_bottons, s.default)}
            onClick={onSubmit}
          >
            Добавить
          </button>
        </div>
      </div>
    </div>
  );
};
