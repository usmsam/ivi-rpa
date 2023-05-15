import { AiOutlineEnter } from "react-icons/ai";
import { BsPencilSquare } from "react-icons/bs";
import s from "./profiles.module.scss";
import { useState } from "react";

export const Profiles = () => {
  return (
    <div className={s.content}>
      <div className={s.fileUpload}>
        <h2>Профили</h2>
        <div className={s.cenariosSearch}>
          <input placeholder="Введите ID профиля" />
          <button className={s.enterBtn}>
            <AiOutlineEnter />
          </button>
        </div>
        <div className={s.uploadBtn}>Создать профиль +</div>
      </div>
      <div className={s.table}>
        <table>
          <thead>
            <tr className={s.tableHead}>
              <th>ID</th>
              <th>Name</th>
              <th>Кол-во сгенерированных</th>
              <th>Предел генерации:</th>
              <th></th>
            </tr>
          </thead>
          <br></br>
          <tbody>
            <tr>
              <th>41613</th>
              <th>Тут должно быть имя</th>
              <td>7214</td>
              <td>10000</td>
              <td>
                <BsPencilSquare className={s.BsPencilSquare} />
              </td>
            </tr>
          </tbody>
          <br></br>
        </table>
        <div className={s.loadMore}>Ракрыть полностью ↓</div>
      </div>
    </div>
  );
};
