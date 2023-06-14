import cn from "classnames";
import React, { useEffect, useState } from "react";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { Checkbox } from "../Checkbox/Checkbox";
import { Input } from "../Input/Input";

import s from "./editor.module.scss";
import { MultiSelect } from "../MultiSelect/MultiSelect";
import {
  getScenarioById,
  updateScenario,
} from "../../shared/api/routes/scenarios";
import { useRef } from "react";
import { DatePicker } from "../DatePicker/DatePicker";
import { useDispatch, useSelector } from "react-redux";
import { getFrameUrls, postFrameUrls } from "../../shared/api/routes/tags";
import {
  setAllFrameUrls,
  setFrameUrl,
} from "../../shared/store/slices/frameUrl";

export const Editor = ({
  isActive = false,
  setIsActive = () => {},
  frame_urls = [],
  backlist_urls = [],
  thumbnails = [],
  id,
}) => {
  const [name, setName] = useState("");
  const [maxCount, setMaxCount] = useState(null);
  const [ttl, setTtl] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [jsScript, setJsScript] = useState("");
  // const [scroll, setScroll] = useState("");
  const [playerVisibility, setPlayerVisibility] = useState("");
  const [valueFrom, setValueFrom] = useState("");
  const [valueTo, setValueTo] = useState("");
  const [frameUrls, setFrameUrls] = useState([]);
  const [backlist, setBacklist] = useState("");
  const [profiles_ids, setProfilesIds] = useState([]);
  const [clicks, setClicks] = useState(false);
  const [clicks_prob, setClicksProb] = useState("");
  const [clicks_ttl, setClicksTtl] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [menuIsOpen, setMenuIsOpen] = useState();

  const frameUrlsRef = useRef(null);
  const backlistRef = useRef(null);
  const profilesRef = useRef(null);

  const dispatch = useDispatch();
  let state = useSelector((state) => state.frameUrl);

  const createFrameUrl = async (url) => {
    try {
      if (url === "") return;
      const data = await postFrameUrls({ url: url });
      if (data) {
        let { data: newUrls } = await getFrameUrls();

        let newUrl = newUrls.filter((el) => el.url === url)[0];
        let newSelectOption = { value: newUrl.id, label: newUrl.url };
        setFrameUrls((prev) => [...prev, newSelectOption]);
        dispatch(setFrameUrl(""));
        dispatch(setAllFrameUrls(newUrls));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    frameUrlsRef.current.setValue(frameUrls);
  }, [frameUrls]);

  const onSubmit = () => {
    try {
      const getScenariosdt = async () => {
        await updateScenario(id, {
          name: name,
          frame_urls: frameUrls.map((el) => el.value) || [],
          ttl: ttl,
          width: width,
          height: height,
          blacklist: backlist.map((el) => el.value) || [],
          clicks: clicks,
          click_prob: clicks_prob,
          click_ttl: clicks_ttl,
          profiles_ids: profiles_ids.map((el) => el.value) || [],
          inject_script: jsScript,
          // scroll_amount: scroll,
          player_visibility: playerVisibility,
        });
      };
      getScenariosdt();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      const getScenariosdt = async () => {
        if (id) {
          const { data } = await getScenarioById(id);
          if (data) {
            setName(data[0].name);
            setWidth(data[0].width);
            setHeight(data[0].height);
            setTtl(data[0].ttl);
            setClicks(data[0].clicks);
            setClicksProb(data[0].click_prob);
            setClicksTtl(data[0].click_ttl);
            setJsScript(data[0].inject_script);
            // setScroll(data[0].scroll_amount);
            setValueTo(data[0].work_timerange_end.slice(0, 4));
            setValueFrom(data[0].work_timerange_start.slice(0, 4));
            setStartDate(data[0].campaign_lifetime_start);
            setEndDate(data[0].campaign_lifetime_end);
            frameUrlsRef.current.setValue(
              data[0].frame_urls.map((el) => ({ value: el.id, label: el.url }))
            );
            backlistRef.current.setValue(
              data[0].blacklist.map((el) => ({ value: el.id, label: el.url }))
            );
            profilesRef.current.setValue(
              data[0].profiles.map((el) => ({ value: el.id, label: el.name }))
            );
            setPlayerVisibility(data[0].player_visibility);
          }
        }
      };
      getScenariosdt();
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  return (
    <div
      className={cn(s.editor, { [s.active]: isActive })}
      onClick={() => setIsActive(!isActive)}
    >
      <div className={s.editorWrapper} onClick={(e) => e.stopPropagation()}>
        <div className={s.title}>Scenario Editor</div>
        <Input
          label="Название сценария:"
          placeholder="Введите название..."
          value={name}
          onChange={setName}
        />
        <div className={s.label}>Сайты:</div>
        <div className={s.frameUrlSelect}>
          <MultiSelect
            options={state.allFrameUrls.map((el) => ({
              value: el.id,
              label: el.url,
            }))}
            ref={frameUrlsRef}
            onChange={setFrameUrls}
            inputValue={state.url}
            onInputChange={(inputValue, { action, prevInputValue }) => {
              if (action === "input-change") {
                dispatch(setFrameUrl(inputValue));
                return inputValue;
              }
              if (action === "menu-close") {
                if (prevInputValue) setMenuIsOpen(true);
                else setMenuIsOpen(undefined);
              }
              dispatch(setFrameUrl(prevInputValue));
              return prevInputValue;
            }}
            menuIsOpen={menuIsOpen}
          />
          {state.url !== "" ? (
            <button
              className={s.sendButton}
              onClick={() => {
                createFrameUrl(state.url);
                dispatch(setFrameUrl(""));
              }}
            >
              Add
            </button>
          ) : null}
        </div>
        <Input
          label="Time to Live (секунд):"
          placeholder="Введите TTL..."
          type="number"
          value={ttl}
          onChange={setTtl}
        />
        <Input
          label="Ширина окна:"
          placeholder="Введите ширину"
          value={width}
          min={360}
          max={1920}
          onChange={setWidth}
        />
        <Input
          label="Высота окна:"
          placeholder="Введите высоту.."
          value={height}
          min={360}
          max={1080}
          onChange={setHeight}
        />
        <Input
          label="Инжект скрипт:"
          placeholder="Введите скрипт..."
          value={jsScript}
          onChange={setJsScript}
          type="text"
        />
        <Input
          label="Видимость плеера (%):"
          placeholder="Введите значение..."
          value={playerVisibility}
          onChange={setPlayerVisibility}
          min={0}
          max={512}
          type="numer"
        />
        <div className={s.label}>Запрещенные адреса (IP/Domain):</div>
        <MultiSelect
          options={backlist_urls.map((el) => ({ value: el.id, label: el.url }))}
          ref={backlistRef}
          onChange={setBacklist}
        />
        <Input
          label="Лимит запусков в сутки:"
          placeholder="Введите значение"
          min={0}
          value={maxCount}
          onChange={setMaxCount}
          type="number"
        />
        <Checkbox label="Clicks" checked={clicks} setChecked={setClicks} />
        {clicks && (
          <>
            <Input
              label="Вероятноть клика (%):"
              placeholder="Введите число от 0 до 100..."
              value={clicks_prob}
              onChange={(e) => {
                setClicksProb(e);
                if (Number(e) > 100) {
                  setClicksProb(100);
                } else if (Number(e) < 0) {
                  setClicksProb(0);
                }
              }}
              min={0}
              max={100}
              step={1}
            />
            <Input
              label="Время до закрытия вкладки (секунд):"
              placeholder="Введите TTL..."
              min={0}
              value={clicks_ttl}
              onChange={setClicksTtl}
              type="number"
            />
          </>
        )}

        <div className={s.timePickers}>
          <div className={s.label}>График запуска</div>
          <span className={s.label}>С</span>
          <TimePicker
            onChange={setValueFrom}
            value={valueFrom}
            maxTime="23:59"
            disableClock
            className={s.timepicker}
            required
          />{" "}
          <span className={s.label}>До</span>
          <TimePicker
            onChange={setValueTo}
            value={valueTo}
            maxTime="23:59"
            disableClock
            className={s.timepicker}
            required
          />
        </div>
        <p className={s.label}>Срок кампании</p>
        <div className={s.campaignPickers}>
          <span className={s.label}>С</span>
          <DatePicker startDate={startDate} setStartDate={setStartDate} />
          <span className={s.label}>По</span>
          <DatePicker startDate={endDate} setStartDate={setEndDate} />
        </div>
        <div className={s.label}>Профили</div>
        <MultiSelect
          ref={profilesRef}
          options={thumbnails.map((el) => ({ value: el.id, label: el.name }))}
          onChange={setProfilesIds}
        />
        <div className={s.editor_bottons}>
          <button
            className={cn(s.editor_bottons, s.default)}
            onClick={onSubmit}
          >
            Сохранить
          </button>
          <button className={cn(s.editor_bottons, s.dashed)}>Reset</button>
        </div>
      </div>
    </div>
  );
};
