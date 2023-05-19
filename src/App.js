import s from "./App.module.scss";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  // HashRouter,
} from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";

import { Sidebar } from "./components/Sidebar/Sidebar";
import { Editor } from "./components/Editor/Editor";
import { CreateProfile } from "./components/CreateProfile/CreateProfile";
import { useEffect, useState } from "react";
import { Proxies } from "./views/Proxies/Proxies";
import { Scenarios } from "./views/Scenarios/Scenarios";
import { Settings } from "./views/Settings/Settings";
import { Profiles } from "./views/Profiles/Profiles";
import { ProfileEdit } from "./components/ProlifeEdit/ProfileEdit";
import {
  getBlacklistUrls,
  getEngines,
  getFrameUrls,
  getPlatforms,
  getProfilesThumbnails,
  getTags,
} from "./shared/api/routes/tags";
import { CreateScenario } from "./components/CreateScenario/CreateScenario";

function App() {
  const [state, setstate] = useState(false);
  const [state2, setstate2] = useState(false);
  const [state3, setstate3] = useState(false);
  const [state4, setstate4] = useState(false);
  const [tags, settags] = useState([]);
  const [urls1, setUrls1] = useState([]);
  const [urls2, setUrls2] = useState([]);
  const [thumbnails, setThumbnails] = useState([]);
  const [platforms, setplatforms] = useState([]);
  const [engines, setengines] = useState([]);
  const [editableProfile, setEditableProfile] = useState(0);
  const [editableScenario, setEditableScenario] = useState(0);

  useEffect(() => {
    try {
      const getScenariosdt = async () => {
        const { data: tags } = await getTags();
        const { data: platforms } = await getPlatforms();
        const { data: engines } = await getEngines();
        const { data: urls1 } = await getFrameUrls();
        const { data: urls2 } = await getBlacklistUrls();
        const { data: thumbnails } = await getProfilesThumbnails();
        settags(tags);
        setUrls1(urls1);
        setUrls2(urls2);
        setThumbnails(thumbnails);
        setplatforms(platforms);
        setengines(engines);
      };
      getScenariosdt();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <Router>
      <Editor
        isActive={state}
        setIsActive={setstate}
        backlist_urls={urls2}
        frame_urls={urls1}
        id={editableScenario}
        thumbnails={thumbnails}
      />
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
      <CreateScenario
        isActive={state4}
        setIsActive={setstate4}
        backlist_urls={urls2}
        frame_urls={urls1}
        thumbnails={thumbnails}
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
            <Route
              path="/"
              element={
                <Scenarios
                  onClick={setstate}
                  setEditableScenario={setEditableScenario}
                  createScenarioHandler={setstate4}
                />
              }
            />
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
  );
}

export default App;
