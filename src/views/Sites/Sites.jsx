import { useDispatch } from "react-redux";
import s from "./sites.module.scss";
import { useEffect } from "react";

export const Sites = ({ onClick = () => {} }) => {
  const dispatch = useDispatch();

  useEffect(() => {}, [dispatch]);

  return (
    <div className={s.content}>
      <div className={s.fileUpload}>
        <h2>Сайты</h2>
        <div className={s.uploadBtn} onClick={onClick}>
          Добавить сайт
        </div>
      </div>

      <div className={s.table}>
        <table>
          <thead>
            <tr className={s.tableHead}>
              <th>#</th>
              <th>Название</th>
              <th>Ссылка</th>
              <th>Css-селектор</th>
            </tr>
          </thead>
          <br></br>
          <tbody>
            <tr>
              <td>1</td>
              <td>google</td>
              <td>
                <a href="https://google.com/">https://google.com/</a>
              </td>
              <td>block-css_selector</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
