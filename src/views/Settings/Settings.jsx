import s from "./settings.module.scss";

export const Settings = () => {
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

      {/* <div className={s.table}>
        <table>
          <thead>
            <tr className={s.tableHead}>
              <th>#</th>
              <th>Прокси (IP:PORT)</th>
              <th>Статус</th>
              <th>Логин</th>
              <th>Тип</th>
              <th>Отклик</th>
            </tr>
          </thead>
          <br></br>
          <tbody>
            <tr>
              <th>41613</th>
              <td>185.220.35.242:36630</td>
              <td>Valid</td>
              <td>WI9cIj</td>
              <td>HTTP(S)</td>
              <td>640 ms</td>
            </tr>
          </tbody>
          <br></br>
        </table>
        <div className={s.loadMore}>Ракрыть полностью ↓</div>
      </div> */}
    </div>
  );
};
