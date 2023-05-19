import { useEffect, useState } from "react";
import { AiFillDelete, AiOutlineEnter } from "react-icons/ai";
import { GoCloudUpload } from "react-icons/go";
import { getProxies, proxieDelete } from "../../shared/api/routes/proxies";

import s from "./proxies.module.scss";

export const Proxies = () => {
  const [state, setState] = useState([]);

  const deleteProxie = async (id) => {
    const { data } = await proxieDelete(id);
    console.log(data);
    getProxies().then((res) => setState(res.data));
  };

  useEffect(() => {
    try {
      const getScenariosdt = async () => {
        const { data } = await getProxies();
        console.log(data);
        setState(data);
      };
      getScenariosdt();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div className={s.content}>
      <div className={s.fileUpload}>
        <h2>Сценарии</h2>
        <div className={s.cenariosSearch}>
          <input placeholder="Введите IP" />
          <button className={s.enterBtn}>
            <AiOutlineEnter />
          </button>
        </div>
        <div className={s.uploadBtn}>
          Загрузить прокси файлы <GoCloudUpload className={s.GoCloudUpload} />
        </div>
      </div>

      <div className={s.table}>
        <table>
          <thead>
            <tr className={s.tableHead}>
              <th>#</th>
              <th>Прокси (IP:PORT)</th>
              <th>Статус</th>
              <th>Логин</th>
              <th>Тип</th>
              <th>Отклик</th>
              <th></th>
            </tr>
          </thead>
          <br></br>
          <tbody>
            {state.length &&
              state.map(
                ({
                  delay,
                  host,
                  id,
                  password,
                  port,
                  status,
                  type,
                  username,
                }) => {
                  return (
                    <tr>
                      <th>{id}</th>
                      <td>
                        {host}:{port}
                      </td>
                      <td>{status ? status : "-"}</td>
                      <td>{username ? username : "-"}</td>
                      <td>{type ? type : "-"}</td>
                      <td>{delay ? delay : "-"}</td>
                      <td>
                        <AiFillDelete
                          className={s.AiFillDelete}
                          onClick={() => deleteProxie(id)}
                        />
                      </td>
                    </tr>
                  );
                }
              )}
          </tbody>
          <br></br>
        </table>
        {/* <div className={s.loadMore}>Ракрыть полностью ↓</div> */}
      </div>
    </div>
  );
};
