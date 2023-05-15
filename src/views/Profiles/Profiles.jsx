import { AiOutlineEnter, AiOutlineSearch } from "react-icons/ai";
import { GoCloudUpload } from "react-icons/go";
import { BsPencilSquare } from "react-icons/bs";
import { Input } from "../../components/Input/Input";
import s from "./profiles.module.scss";
import { useState } from "react";

export const Profiles = () => {
  const [state, setstate] = useState("");
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
              <th>Кол-во сгенерированных</th>
              <th>
                <div className={s.thSearch}>
                  Предел генерации:{" "}
                  <Input
                    className={s.input}
                    value={state}
                    onChange={setstate}
                  />
                </div>
              </th>
              <th></th>
            </tr>
          </thead>
          <br></br>
          <tbody>
            <tr>
              <th>41613</th>
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
