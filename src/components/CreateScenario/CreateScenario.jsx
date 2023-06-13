import cn from "classnames";
import React, { useState } from "react";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { Checkbox } from "../Checkbox/Checkbox";
import { Input } from "../Input/Input";

import s from "./createScenario.module.scss";
import { MultiSelect } from "../MultiSelect/MultiSelect";
import {
  getScenariosStats,
  postScenarios,
} from "../../shared/api/routes/scenarios";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setScenariosData } from "../../shared/store/slices/scenarios";
import { DatePicker } from "../DatePicker/DatePicker";
import { postFrameUrls } from "../../shared/api/routes/tags";
import { setFrameUrl } from "../../shared/store/slices/frameUrl";

export const CreateScenario = ({
  isActive = false,
  setIsActive = () => {},
  frame_urls = [],
  backlist_urls = [],
  thumbnails = [],
}) => {
  const [name, setName] = useState("");
  const [ttl, setTtl] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [jsScript, setJsScript] = useState("");
  const [scroll, setScroll] = useState("");
  const [valueFrom, setValueFrom] = useState("");
  const [valueTo, setValueTo] = useState("");
  const [frameUrls, setFrameUrls] = useState([]);
  const [backlist, setBacklist] = useState([]);
  const [profiles_ids, setProfilesIds] = useState([]);
  const [clicks, setClicks] = useState(false);
  const [clicks_prob, setClicksProb] = useState("");
  const [clicks_ttl, setClicksTtl] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [maxCount, setMaxCount] = useState("");

  const frameUrlsRef = useRef(null);
  const backlistRef = useRef(null);
  const profilesRef = useRef(null);


  const reset = () => {
    setName("");
    setTtl("");
    setWidth("");
    setHeight("");
    frameUrlsRef.current.setValue([]);
    backlistRef.current.setValue([]);
    profilesRef.current.setValue([]);
    setClicks(false);
    setClicksProb("");
    setClicksTtl("");
    setValueFrom(null);
    setValueTo(null);
  };
  const dispatch = useDispatch();
  let state = useSelector((state) => state.frameUrl);
  const onSubmit = () => {
    try {
      const getScenariosdt = async () => {
        const { data } = await postScenarios({
          name: name,
          ttl: +ttl,
          width: +width,
          height: +height,
          clicks: clicks,
          click_prob: +clicks_prob,
          click_ttl: +clicks_ttl,
          work_timerange_start: valueFrom ? valueFrom.concat(":00") : null,
          work_timerange_end: valueTo ? valueTo.concat(":00") : null,
          frame_urls_ids: frameUrls.map((el) => el.value),
          blacklist_ids: backlist.map((el) => el.value),
          profiles_ids: profiles_ids.map((el) => el.value),
          inject_script: jsScript,
          scroll_amount: +scroll,
          campaign_lifetime_start: startDate,
          campaign_lifetime_end: endDate,
        });
        if (data) {
          getScenariosStats().then((res) =>
            dispatch(setScenariosData(res.data))
          );
          reset();
        }
      };
      getScenariosdt();
    } catch (error) {
      console.log(error);
    }
  };
  const createFrameUrl = async (url) => {
    try {
      if (url === "") return;
      const data = await postFrameUrls({ url: url });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const [menuIsOpen, setMenuIsOpen] = useState();
  return (
    <div
      className={cn(s.editor, { [s.active]: isActive })}
      onClick={() => setIsActive(!isActive)}
    >
      <div className={s.editorWrapper} onClick={(e) => e.stopPropagation()}>
        <div className={s.title}>Create Scenario</div>
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
              Send
            </button>
          ) : null}
        </div>
        <Input
          label="Time to Live (секунд):"
          placeholder="Введите TTL..."
          value={ttl}
          onChange={setTtl}
          type="number"
        />
        <Input
          label="Ширина окна:"
          placeholder="Введите ширину.."
          value={width}
          min={360}
          max={1920}
          onChange={setWidth}
          type="number"
        />
        <Input
          label="Высота окна:"
          placeholder="Введите высоту.."
          value={height}
          min={360}
          max={1080}
          onChange={setHeight}
          type="number"
        />
        <Input
          label="Инжект скрипт:"
          placeholder="Введите скрипт..."
          value={jsScript}
          onChange={setJsScript}
          type="text"
        />
        <Input
          label="Скролл (пикселей):"
          placeholder="Введите значение..."
          value={scroll}
          onChange={setScroll}
          min={0}
          max={512}
          type="number"
        />
        <div className={s.label}>Запещенные адреса (IP/Domain):</div>
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
        <Checkbox label="Клики включены" checked={clicks} setChecked={setClicks} />
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
              type="number"
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
          <span className={s.label}>С&nbsp;</span>
          <DatePicker startDate={startDate} setStartDate={setStartDate} />
          <span className={s.label}>По&nbsp;</span>
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
          <button className={cn(s.editor_bottons, s.dashed)} onClick={reset}>
            Сбросить
          </button>
        </div>
      </div>
    </div>
  );
};
