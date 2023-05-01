import "./App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AiOutlineEnter, AiOutlineSearch } from "react-icons/ai";
import { RiArrowDownSLine } from "react-icons/ri";
import { GoCloudUpload } from "react-icons/go";
import {
  BsFillPlayFill,
  BsFillRecordFill,
  BsPencilSquare,
} from "react-icons/bs";
import { Sidebar } from "./components/Sidebar/Sidebar";
function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <main className="main">
          <div className="top">
            <div className="search">
              <input placeholder="Поиск по системе" />
              <AiOutlineSearch className="searchBtn" />
            </div>
            <div className="middle"></div>
            <div className="person">
              <div className="avatar">C1</div>
              <span className="name">Сотрудник #1</span>
            </div>
          </div>
          <div className="content">
            <div className="fileUpload">
              <h2>Сценарии</h2>
              <div className="cenariosSearch">
                <input placeholder="Введите параметр сценария" />
                <button className="enterBtn">
                  <AiOutlineEnter />
                </button>
              </div>
              <div className="uploadBtn">
                Загрузить файлы сценариев{" "}
                <GoCloudUpload className="GoCloudUpload" />
              </div>
            </div>

            <div className="table">
              <Routes>
                <Route
                  path="/proxy"
                  element={
                    <table>
                      <thead>
                        <tr className="tableHead">
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
                  }
                />

                <Route
                  path="/"
                  element={
                    <table>
                      <thead>
                        <tr className="tableHead">
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
                      {/* <tbody>
                  <tr className="firstRow">
                    <th></th>
                    <td>Итого:</td>
                    <td></td>
                    <td></td>
                    <td>1 499 922 967</td>
                    <td>135 086 3777</td>
                    <td>24 184 079</td>
                    <td>9,0</td>
                    <td>9,0</td>
                    <td>sxaas</td>
                    <td>dasd</td>
                    <td></td>
                  </tr>
                </tbody> */}
                      <br></br>
                      <tbody>
                        <tr>
                          <th className="idCol">41613</th>
                          <td>In-Stream Video Desktop</td>
                          <td className="statusCol">
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
                            <BsPencilSquare className="BsPencilSquare" />
                          </td>
                        </tr>
                        <tr>
                          <th className="idCol">41613</th>
                          <td>In-Stream Video Desktop</td>
                          <td className="statusCol">
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
                            <BsPencilSquare className="BsPencilSquare" />
                          </td>
                        </tr>
                        <tr>
                          <th className="idCol">41613</th>
                          <td>In-Stream Video Desktop</td>
                          <td className="statusCol">
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
                            <BsPencilSquare className="BsPencilSquare" />
                          </td>
                        </tr>
                        <tr>
                          <th className="idCol">41613</th>
                          <td>In-Stream Video Desktop</td>
                          <td className="statusCol">
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
                            <BsPencilSquare className="BsPencilSquare" />
                          </td>
                        </tr>
                      </tbody>
                      <br></br>
                    </table>
                  }
                />
              </Routes>

              <div className="loadMore">Ракрыть полностью ↓</div>
            </div>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
