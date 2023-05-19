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

export const Editor = ({
  isActive = false,
  setIsActive = () => {},
  urls = [],
  id,
}) => {
  const [name, setName] = useState("");
  const [ttl, setTtl] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [valueFrom, setValueFrom] = useState("");
  const [valueTo, setValueTo] = useState("");
  const [frameUrls, setFrameUrls] = useState([]);
  const [backlist, setBacklist] = useState("");
  const [clicks, setClicks] = useState(false);
  const [clicks_prob, setClicksProb] = useState(false);
  const [clicks_ttl, setClicksTtl] = useState(false);

  const frameUrlsRef = useRef(null);
  const backlistRef = useRef(null);

  const options = urls.map((el) => ({ value: el.id, label: el.url }));
  const onSubmit = () => {
    try {
      const getScenariosdt = async () => {
        const data = await updateScenario(id, {
          name: name,
          frame_uls: frameUrls.map((el) => el.id),
          ttl: ttl,
          width: width,
          height: height,
          blacklist: backlist.map((el) => el.id),
          clicks: clicks,
          click_prob: clicks_prob,
          click_ttl: clicks_ttl,
        });
        console.log(data);
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
          console.log(data);
          setName(data[0].name);
          setWidth(data[0].width);
          setHeight(data[0].height);
          setTtl(data[0].ttl);
          frameUrlsRef.current.setValue(
            data[0].frame_urls.map((el) => ({ value: el.id, label: el.url }))
          );
          backlistRef.current.setValue(
            data[0].blacklist.map((el) => ({ value: el.id, label: el.url }))
          );
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
          label="Scenario Name:"
          subtitle="Enter scenario name."
          placeholder="Enter name"
          value={name}
          onChange={setName}
        />
        <div className={s.label}>Frame URLs:</div>
        <MultiSelect
          options={options}
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
        />
        <Input
          label="Height:"
          placeholder="Enter height"
          value={height}
          onChange={setHeight}
        />
        <div className={s.label}>Backlist:</div>
        <MultiSelect
          options={options}
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
              onChange={setClicksProb}
            />
            <Input
              label="Time to Live After Click (sec):"
              subtitle="Enter TTL after click"
              placeholder="Enter time to live after click in seconds."
              value={clicks_ttl}
              onChange={setClicksTtl}
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
        />{" "}
        <span className={s.label}>To : </span>
        <TimePicker
          onChange={setValueTo}
          value={valueTo}
          maxTime="23:59"
          disableClock
          className={s.timepicker}
        />
        {/* <div className={s.label}>Tags</div> */}
        {/* <MultiSelect options={options} /> */}
        <div className={s.editor_bottons}>
          <button
            className={cn(s.editor_bottons, s.default)}
            onClick={onSubmit}
          >
            Save
          </button>
          <button className={cn(s.editor_bottons, s.dashed)}>Reset</button>
        </div>
      </div>
    </div>
  );
};
