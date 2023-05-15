import s from "./App.module.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";

import { Sidebar } from "./components/Sidebar/Sidebar";
import { Editor } from "./components/Editor/Editor";
import { useState } from "react";
import { Proxies } from "./views/Proxies/Proxies";
import { Scenarios } from "./views/Scenarios/Scenarios";
import { Settings } from "./views/Settings/Settings";
import { Profiles } from "./views/Profiles/Profiles";

function App() {
  const [state, setstate] = useState(false);
  return (
    <Router>
      <Editor isActive={state} setIsActive={setstate} />
      <div className={s.App}>
        <Sidebar />
        <main className={s.main}>
          <div className={s.top}>
            <div className={s.search}>
              <input placeholder="Поиск по системе" />
              <AiOutlineSearch className={s.searchBtn} />
            </div>
            <div className={s.middle}></div>
            <div className={s.person}>
              <div className={s.avatar}>C1</div>
              <span className={s.name}>Сотрудник #1</span>
            </div>
          </div>

          <Routes>
            <Route path="/" element={<Scenarios onClick={setstate} />} />
            <Route path="/proxy" element={<Proxies />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profiles" element={<Profiles />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
