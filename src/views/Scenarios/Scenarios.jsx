import { AiOutlineEnter } from "react-icons/ai";
import { RiArrowDownSLine } from "react-icons/ri";
import { GoCloudUpload } from "react-icons/go";
import { BsFillPlayFill, BsPencilSquare } from "react-icons/bs";

import s from "./scenarios.module.scss";
import { useEffect } from "react";
import {
  getScenariosStats,
  // scenarioDisable,
  // scenarioEnable,
} from "../../shared/api/routes/scenarios";

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
}) => {
  // const [state, setState] = useState([]);

  useEffect(() => {
    try {
      const getScenariosdt = async () => {
        const data = await getScenariosStats();
        console.log(data);
        // setState(data);
      };
      getScenariosdt();
    } catch (error) {
      console.log(error);
    }
  }, []);

  // const scenarioEnableHandler = async (id) => {
  //   try {
  //     await scenarioEnable(id);
  //   } catch (error) {}
  // };
  // const scenarioDisableHandler = async (id) => {
  //   try {
  //     await scenarioDisable(id);
  //   } catch (error) {}
  // };

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
        <label className={s.uploadBtn}>
          <input type="file" name="scenario" className={s.fileInput} />
          Загрузить файлы сценариев{" "}
          <GoCloudUpload className={s.GoCloudUpload} />
        </label>
      </div>

      <div className={s.table}>
        <table>
          <thead>
            <tr className={s.tableHead}>
              <th>#</th>
              <th>
                Название <RiArrowDownSLine />
              </th>
              <th>
                Статус <RiArrowDownSLine />
              </th>
              <th>
                ID площадки <RiArrowDownSLine />
              </th>
              <th>
                Запросы <RiArrowDownSLine />
              </th>
              <th>
                Ответы <RiArrowDownSLine />
              </th>
              <th>
                Показы <RiArrowDownSLine />
              </th>
              <th>
                Fill Rate, % <RiArrowDownSLine />
              </th>
              <th>
                Show Rate, % <RiArrowDownSLine />
              </th>
              <th>
                Клики <RiArrowDownSLine />
              </th>
              <th>
                CTR <RiArrowDownSLine />
              </th>
              <th> </th>
            </tr>
          </thead>
          <br></br>
          <tbody>
            <tr>
              <th className={s.idCol}>41613</th>
              <td>In-Stream Video Desktop</td>
              <td className={s.statusCol}>
                Запустить <BsFillPlayFill />
              </td>
              <td>869907</td>
              <td>1 499 922 967</td>
              <td>135 086 3777</td>
              <td>24 184 079</td>
              <td>9,0</td>
              <td>9,0</td>
              <td>sxaas</td>
              <td>dasd</td>
              <td>
                {/* <Link to={`?edit=${1}`}> */}
                <BsPencilSquare
                  className={s.BsPencilSquare}
                  onClick={(e) => {
                    onClick(e);
                    // setEditableScenario(id);
                  }}
                />
                {/* </Link> */}
              </td>
            </tr>
            {/* <tr>
              <th className={s.idCol}>41613</th>
              <td>In-Stream Video Desktop</td>
              <td className={s.statusCol}>
                Остановить <BsFillRecordFill />
              </td>
              <td>869907</td>
              <td>1 499 922 967</td>
              <td>135 086 3777</td>
              <td>24 184 079</td>
              <td>9,0</td>
              <td>9,0</td>
              <td>sxaas</td>
              <td>dasd</td>
              <td>
                <BsPencilSquare className={s.BsPencilSquare} />
              </td>
            </tr> */}
          </tbody>
          <br></br>
        </table>
        {/* <div className={s.loadMore}>Ракрыть полностью ↓</div> */}
      </div>
    </div>
  );
};
