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
import { useDispatch } from "react-redux";
import { setScenariosData } from "../../shared/store/slices/scenarios";
export const CreateScenario = ({
  isActive = false,
  setIsActive = () => {},
  frame_urls = [],
  backlist_urls = [],
  thumbnails = [],
}) => {
  const [name, setName] = useState("");
  const [pageUrl, setPageUrl] = useState("");
  const [ttl, setTtl] = useState("");
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);
  const [jsScript, setJsScript] = useState(null);
  const [scroll, setScroll] = useState(null);
  const [valueFrom, setValueFrom] = useState("");
  const [valueTo, setValueTo] = useState("");
  const [frameUrls, setFrameUrls] = useState([]);
  const [backlist, setBacklist] = useState([]);
  const [profiles_ids, setProfilesIds] = useState([]);
  const [clicks, setClicks] = useState(false);
  const [clicks_prob, setClicksProb] = useState(null);
  const [clicks_ttl, setClicksTtl] = useState(null);

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
  const onSubmit = () => {
    try {
      const getScenariosdt = async () => {
        const { data } = await postScenarios({
          name: name,
          page_url: pageUrl,
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
        });
        if (data) {
          reset();
        }
      };
      getScenariosdt();
      getScenariosStats().then((res) => dispatch(setScenariosData(res.data)));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={cn(s.editor, { [s.active]: isActive })}
      onClick={() => setIsActive(!isActive)}
    >
      <div className={s.editorWrapper} onClick={(e) => e.stopPropagation()}>
        <div className={s.title}>Create Scenario</div>
        <Input
          label="Scenario Name:"
          subtitle="Enter scenario name."
          placeholder="Enter name"
          value={name}
          onChange={setName}
        />
        <Input
          label="Page url:"
          subtitle="Enter page url."
          placeholder="Enter page url"
          value={pageUrl}
          onChange={setPageUrl}
        />
        <div className={s.label}>Frame URLs:</div>
        <MultiSelect
          options={frame_urls.map((el) => ({ value: el.id, label: el.url }))}
          ref={frameUrlsRef}
          onChange={setFrameUrls}
        />
        <Input
          label="Time to Live (sec):"
          subtitle="Enter TTL"
          type="number"
          placeholder="Enter time to live in seconds."
          value={ttl}
          onChange={setTtl}
        />
        <Input
          label="Width:"
          placeholder="Enter width"
          value={width}
          onChange={setWidth}
          type="number"
        />
        <Input
          label="Height:"
          placeholder="Enter height"
          value={height}
          onChange={setHeight}
          type="number"
        />
        <Input
          label="JS script:"
          placeholder="Enter script"
          value={jsScript}
          onChange={setJsScript}
          type="text"
        />
        <Input
          label="Scroll :"
          placeholder="Enter scroll"
          value={scroll}
          onChange={setScroll}
          type="number"
        />
        <div className={s.label}>Blacklist:</div>
        <MultiSelect
          options={backlist_urls.map((el) => ({ value: el.id, label: el.url }))}
          ref={backlistRef}
          onChange={setBacklist}
        />
        <Checkbox label="Clicks" checked={clicks} setChecked={setClicks} />
        {clicks && (
          <>
            <Input
              label="Click Probability:"
              subtitle="Enter click probability"
              placeholder="Enter click probability as s decimal between 0 and 1."
              value={clicks_prob}
              onChange={(e) => {
                setClicksProb(e);
                if (Number(e) > 1) {
                  setClicksProb(1);
                }
              }}
              type="number"
              min={0}
              max={1}
              step={0.1}
            />
            <Input
              label="Time to Live After Click (sec):"
              subtitle="Enter TTL after click"
              placeholder="Enter time to live after click in seconds."
              value={clicks_ttl}
              onChange={setClicksTtl}
              type="number"
            />
          </>
        )}
        <div className={s.label}>Work Time</div>
        <span className={s.label}>From : </span>
        <TimePicker
          onChange={setValueFrom}
          value={valueFrom}
          maxTime="23:59"
          disableClock
          className={s.timepicker}
          required
        />{" "}
        <span className={s.label}>To : </span>
        <TimePicker
          onChange={setValueTo}
          value={valueTo}
          maxTime="23:59"
          disableClock
          className={s.timepicker}
          required
        />
        <div className={s.label}>Profiles</div>
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
            Save
          </button>
          <button className={cn(s.editor_bottons, s.dashed)} onClick={reset}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};
