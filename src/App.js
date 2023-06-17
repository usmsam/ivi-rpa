import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";

import { Profiles, Proxies, Scenarios, Settings, Sites } from "./views";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { ProfileEdit } from "./components/ProlifeEdit/ProfileEdit";
import { CreateScenario } from "./components/CreateScenario/CreateScenario";
import { CreateProfile } from "./components/CreateProfile/CreateProfile";
import { ScenarioEditor } from "./components/ScenarioEditor/ScenarioEditor";

import {
  getBlacklistUrls,
  getBrowsers,
  getEngines,
  getFrameUrls,
  getPlatforms,
  getProfilesThumbnails,
  getTags,
} from "./shared/api/routes/tags";
import { setAllFrameUrls } from "./shared/store/slices/frameUrl";

import s from "./App.module.scss";
import { AddSitesModal } from "./components/AddSitesModal/AddSitesModal";

function App() {
  const [state, setstate] = useState(false);
  const [state2, setstate2] = useState(false);
  const [state3, setstate3] = useState(false);
  const [state4, setstate4] = useState(false);
  const [state5, setstate5] = useState(false);
  const [tags, settags] = useState([]);
  const [urls1, setUrls1] = useState([]);
  const [urls2, setUrls2] = useState([]);
  const [browsers, setBrowsers] = useState([]);
  const [thumbnails, setThumbnails] = useState([]);
  const [platforms, setplatforms] = useState([]);
  const [engines, setengines] = useState([]);
  const [editableProfile, setEditableProfile] = useState(0);
  const [editableScenario, setEditableScenario] = useState(0);

  const dispatch = useDispatch();
  useEffect(() => {
    try {
      const getScenariosdt = async () => {
        const { data: tags } = await getTags();
        const { data: platforms } = await getPlatforms();
        const { data: engines } = await getEngines();
        const { data: urls1 } = await getFrameUrls();
        const { data: urls2 } = await getBlacklistUrls();
        const { data: thumbnails } = await getProfilesThumbnails();
        const { data: browsers } = await getBrowsers();
        settags(tags);
        setUrls1(urls1);
        setUrls2(urls2);
        setThumbnails(thumbnails);
        setplatforms(platforms);
        setengines(engines);
        setBrowsers(browsers);

        dispatch(setAllFrameUrls(urls1));
      };
      getScenariosdt();
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  const { pathname } = useLocation();

  return (
    <>
      <ScenarioEditor
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
        browsers={browsers}
      />
      <CreateProfile
        isActive={state3}
        setIsActive={setstate3}
        tags={tags}
        engines={engines}
        platforms={platforms}
        browsers={browsers}
      />
      <CreateScenario
        isActive={state4}
        setIsActive={setstate4}
        backlist_urls={urls2}
        frame_urls={urls1}
        thumbnails={thumbnails}
      />
      <AddSitesModal isActive={state5} setIsActive={setstate5} />
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
          {pathname === "/" ? (
            <Scenarios
              onClick={setstate}
              setEditableScenario={setEditableScenario}
              createScenarioHandler={setstate4}
            />
          ) : pathname === "/proxy" ? (
            <Proxies />
          ) : pathname === "/settings" ? (
            <Settings />
          ) : pathname === "/profiles" ? (
            <Profiles
              onClick={setstate2}
              createHandler={setstate3}
              setEditableProfile={setEditableProfile}
            />
          ) : pathname === "/sites" ? (
            <Sites
              onClick={() => {
                setstate5((prev) => !prev);
              }}
            />
          ) : (
            <> 404 страница не найдена</>
          )}
          {/* <Routes>
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
            <Route
              path="*"
              element={
                <Scenarios
                  onClick={setstate}
                  setEditableScenario={setEditableScenario}
                  createScenarioHandler={setstate4}
                />
              }
            />
          </Routes> */}
        </main>
      </div>
    </>
  );
}

export default App;
