import cn from "classnames";
import React, { useState } from "react";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { Input } from "../Input/Input";

import s from "./profileEdit.module.scss";
import { MultiSelect } from "../MultiSelect/MultiSelect";
import { useEffect } from "react";
import {
  getProfileByid,
  updateProfile,
} from "../../shared/api/routes/profiles";
import { useRef } from "react";

export const ProfileEdit = ({
  isActive = false,
  setIsActive = () => {},
  tags = [],
  platforms = [],
  engines = [],
  id,
}) => {
  const [name, setName] = useState("");
  const [qty, setQty] = useState();

  const [selectedTags, setSelectedTags] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState(false);
  const [selectedEngines, setSelectedEngines] = useState(false);

  const [tagsItems, setTags] = useState([]);
  const [platfomsItems, setPlatforms] = useState([]);
  const [enginesItems, setEngines] = useState([]);

  const tagsRef = useRef(null);
  const platformsRef = useRef(null);
  const enginesRef = useRef(null);

  useEffect(() => {
    setTags(
      tags &&
        tags.map((el) => {
          return { value: el.id, label: el.name };
        })
    );
    setPlatforms(
      platforms &&
        platforms.map((el) => {
          return { value: el.id, label: el.link };
        })
    );
    setEngines(
      engines &&
        engines.map((el) => {
          return { value: el.id, label: el.link };
        })
    );
  }, [tags, platforms, engines]);

  useEffect(() => {
    try {
      const getScenariosdt = async () => {
        if (id) {
          const { data } = await getProfileByid(id);
          console.log(data);
          setName(data[0].name);
          setQty(data[0].max_quantity);
          tagsRef.current.setValue(
            data[0].tags.map((el) => ({ value: el.id, label: el.name }))
          );
          platformsRef.current.setValue(
            data[0].platforms.map((el) => ({ value: el.id, label: el.link }))
          );
          enginesRef.current.setValue(
            data[0].search_engines.map((el) => ({
              value: el.id,
              label: el.link,
            }))
          );
        }
      };
      getScenariosdt();
    } catch (error) {
      console.log(error);
    }
  }, [id]);
  const onSubmit = async () => {
    console.log({
      name: name,
      max_quantity: +qty,
      tags_ids: selectedTags.map((el) => el.value),
      search_engines_ids: selectedEngines.map((el) => el.value),
      platforms_ids: selectedPlatforms.map((el) => el.value),
    });
    try {
      const data = await updateProfile(id, {
        name: name,
        max_quantity: +qty,
        tags_ids: selectedTags.map((el) => el.value),
        search_engines_ids: selectedEngines.map((el) => el.value),
        platforms_ids: selectedPlatforms.map((el) => el.value),
      });
      if (data.status === 200) {
        setIsActive(false);
      }
    } catch (error) {}
  };
  return (
    <div
      className={cn(s.editor, { [s.active]: isActive })}
      onClick={() => setIsActive(!isActive)}
    >
      <div className={s.editorWrapper} onClick={(e) => e.stopPropagation()}>
        <div className={s.title}>Profile Editor</div>
        <Input
          label="Name:"
          subtitle="Enter  name."
          placeholder="Enter name"
          onChange={setName}
          value={name}
        />
        <Input
          label="Limit:"
          subtitle="Enter limit."
          placeholder="Enter limit"
          type="number"
          onChange={setQty}
          value={qty}
        />
        <div className={s.label}>Tags</div>
        <MultiSelect
          options={tagsItems}
          onChange={setSelectedTags}
          ref={tagsRef}
        />
        <div className={s.label}>Platforms:</div>
        <MultiSelect
          options={platfomsItems}
          onChange={setSelectedPlatforms}
          ref={platformsRef}
        />
        <div className={s.label}>Search Engines</div>
        <MultiSelect
          options={enginesItems}
          onChange={setSelectedEngines}
          ref={enginesRef}
        />

        <div className={s.editor_bottons}>
          <button
            className={cn(s.editor_bottons, s.default)}
            onClick={onSubmit}
          >
            Save
          </button>
          {/* <button className={cn(s.editor_bottons, s.dashed)}>Reset</button> */}
        </div>
      </div>
    </div>
  );
};
