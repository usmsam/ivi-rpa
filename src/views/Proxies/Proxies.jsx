import { useRef } from "react";
import { useEffect, useState } from "react";
import {
  AiFillDelete,
  AiOutlineEnter,
  AiOutlineCloudUpload,
} from "react-icons/ai";
import { GoCloudUpload } from "react-icons/go";
import {
  getProxies,
  proxieDelete,
  uploadProxy,
} from "../../shared/api/routes/proxies";

import s from "./proxies.module.scss";

export const Proxies = () => {
  const [state, setState] = useState([]);
  const [file, setFile] = useState(null);
  const ref = useRef(null);
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

  const onLog = async (e) => {
    try {
      const data = await uploadProxy(ref.current.files[0]);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
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
        <label
          className={s.uploadBtn}
          onMouseOver={() => {
            if (ref.current.files[0]) {
              setFile(true);
            } else {
              setFile(false);
            }
          }}
          onMouseLeave={() => {
            if (ref.current.files[0]) {
              setFile(true);
            } else {
              setFile(false);
            }
          }}
        >
          <form method="post" enctype="multipart/form-data" action="">
            <input
              type="file"
              name="scenario"
              className={s.fileInput}
              ref={ref}
            />
          </form>
          Загрузить прокси файлы <GoCloudUpload className={s.GoCloudUpload} />
        </label>
        {file && (
          <button onClick={onLog} className={s.enterBtn}>
            <AiOutlineCloudUpload />
          </button>
        )}
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
