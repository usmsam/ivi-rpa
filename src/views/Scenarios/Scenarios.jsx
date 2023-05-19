import { AiOutlineEnter } from "react-icons/ai";
import { GoCloudUpload } from "react-icons/go";
import {
  BsFillPlayFill,
  BsFillRecordFill,
  BsPencilSquare,
} from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import s from "./scenarios.module.scss";
import { useEffect } from "react";
import {
  getScenariosStats,
  scenarioDisable,
  scenarioEnable,
} from "../../shared/api/routes/scenarios";
import { setScenariosData } from "../../shared/store/slices/scenarios";

// const mock_scenarios = [
//   {
//     name: "",
//     frame_urls: "",
//     ttl: "",
//     width: "",
//     height: "",
//     blacklist: "",
//     clicks: "",
//     click_prob: "",
//     click_ttl: "",
//     created_at: "",
//     updated_at: "",
//     id: "",
//     status: "",
//   },
// ];

export const Scenarios = ({
  onClick = () => {},
  setEditableScenario = () => {},
  createScenarioHandler = () => {},
}) => {
  const dispatch = useDispatch();
  let { scenarios } = useSelector((state) => state.scenarios);
  useEffect(() => {
    try {
      const getScenariosdt = async () => {
        const { data } = await getScenariosStats();
        console.log(data);
        if (data) {
          dispatch(setScenariosData(data));
        }
      };
      getScenariosdt();
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  const scenarioEnableHandler = async (id) => {
    try {
      await scenarioEnable(id);
      const { data } = await getScenariosStats();
      dispatch(setScenariosData(data));
    } catch (error) {}
  };
  const scenarioDisableHandler = async (id) => {
    try {
      await scenarioDisable(id);
      const { data } = await getScenariosStats();
      dispatch(setScenariosData(data));
    } catch (error) {}
  };

  return (
    <div className={s.content}>
      <div className={s.fileUpload}>
        <h2>Сценарии</h2>
        <div className={s.cenariosSearch}>
          <input placeholder="Введите параметр сценария" />
          <button className={s.enterBtn}>
            <AiOutlineEnter />
          </button>
        </div>
        <label className={s.uploadBtn} onClick={createScenarioHandler}>
          {/* <input type="file" name="scenario" className={s.fileInput} /> */}
          Создать сценарий <GoCloudUpload className={s.GoCloudUpload} />
        </label>
      </div>

      <div className={s.table}>
        <table>
          <thead>
            <tr className={s.tableHead}>
              <th>#</th>
              <th>Название</th>
              <th>Статус</th>

              <th>Запросы</th>
              <th>ответы</th>
              <th>Показы</th>
              <th>Fill Rate, %</th>
              <th>Show Rate, %</th>
              <th>Клики</th>
              <th>Вероятность клика</th>
              <th> </th>
            </tr>
          </thead>
          <br></br>
          <tbody>
            {scenarios.length
              ? scenarios.map(
                  ({
                    clicks_qty,
                    ctr,
                    enabled,
                    fill_rate,
                    id,
                    name,
                    requests_qty,
                    responses_qty,
                    show_rate,
                    shows_qty,
                  }) => {
                    return (
                      <tr key={id}>
                        <th className={s.idCol}>{id}</th>
                        <td>{name}</td>
                        {enabled ? (
                          <td className={s.statusCol}>
                            <span onClick={() => scenarioDisableHandler(id)}>
                              Остановить <BsFillRecordFill />
                            </span>
                          </td>
                        ) : (
                          <td className={s.statusCol}>
                            <span onClick={() => scenarioEnableHandler(id)}>
                              {" "}
                              Запустить <BsFillPlayFill />
                            </span>
                          </td>
                        )}
                        <td>{requests_qty}</td>
                        <td>{responses_qty}</td>
                        <td>{shows_qty}</td>
                        <td>{fill_rate}</td>
                        <td>{show_rate}</td>
                        <td>{clicks_qty}</td>
                        <td>{ctr}</td>
                        <td>
                          {/* <Link to={`?edit=${1}`}> */}
                          <BsPencilSquare
                            className={s.BsPencilSquare}
                            onClick={(e) => {
                              onClick(e);
                              setEditableScenario(id);
                            }}
                          />
                          {/* </Link> */}
                        </td>
                      </tr>
                    );
                  }
                )
              : null}
          </tbody>
          <br></br>
        </table>
        {/* <div className={s.loadMore}>Ракрыть полностью ↓</div> */}
      </div>
    </div>
  );
};
