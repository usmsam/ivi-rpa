import s from "./App.module.scss";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  HashRouter,
} from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";

import { Provider } from "react-redux";
import { store } from "../src/shared/store";

import { Sidebar } from "./components/Sidebar/Sidebar";
import { Editor } from "./components/Editor/Editor";
import { CreateProfile } from "./components/CreateProfile/CreateProfile";
import { useEffect, useState } from "react";
import { Proxies } from "./views/Proxies/Proxies";
import { Scenarios } from "./views/Scenarios/Scenarios";
import { Settings } from "./views/Settings/Settings";
import { Profiles } from "./views/Profiles/Profiles";
import { ProfileEdit } from "./components/ProlifeEdit/ProfileEdit";
import { getEngines, getPlatforms, getTags } from "./shared/api/routes/tags";

function App() {
  const [state, setstate] = useState(false);
  const [state2, setstate2] = useState(false);
  const [state3, setstate3] = useState(false);
  const [tags, settags] = useState([]);
  const [platforms, setplatforms] = useState([]);
  const [engines, setengines] = useState([]);
  const [editableProfile, setEditableProfile] = useState(0);

  useEffect(() => {
    try {
      const getScenariosdt = async () => {
        const { data: tags } = await getTags();
        const { data: platforms } = await getPlatforms();
        const { data: engines } = await getEngines();
        settags(tags);
        setplatforms(platforms);
        setengines(engines);
      };
      getScenariosdt();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Editor isActive={state} setIsActive={setstate} />
        <ProfileEdit
          isActive={state2}
          setIsActive={setstate2}
          tags={tags}
          engines={engines}
          platforms={platforms}
          id={editableProfile}
        />
        <CreateProfile
          isActive={state3}
          setIsActive={setstate3}
          tags={tags}
          engines={engines}
          platforms={platforms}
        />
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
              <Route
                path="/profiles"
                element={
                  <Profiles
                    onClick={setstate2}
                    createHandler={setstate3}
                    setEditableProfile={setEditableProfile}
                  />
                }
              />
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
