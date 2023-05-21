import cn from "classnames";
import React, { useRef, useState, useEffect } from "react";
import { Input } from "../Input/Input";

import s from "./profileEdit.module.scss";
import { MultiSelect } from "../MultiSelect/MultiSelect";
import { getProfiles, postProfiles } from "../../shared/api/routes/profiles";
import { useDispatch } from "react-redux";
import { setProfiles } from "../../shared/store/slices/profiles";

export const CreateProfile = ({
  isActive = false,
  setIsActive = () => {},
  tags = [],
  platforms = [],
  engines = [],
  browsers = [],
}) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [selectedEngines, setSelectedEngines] = useState([]);
  const [selectedBrowsers, setSelectedBrowsers] = useState([]);
  const selectRef = useRef(null);
  const selectRef2 = useRef(null);
  const selectRef3 = useRef(null);
  const selectRef4 = useRef(null);

  const [tagsItems, setTags] = useState([]);
  const [platfomsItems, setPlatforms] = useState([]);
  const [enginesItems, setEngines] = useState([]);

  const dispatch = useDispatch();

  const [DataContent, setDataContent] = useState({
    name: "",
    max_quantity: 0,
    tags_ids: [],
    search_engines_ids: [],
    platforms_ids: [],
    browser: "",
  });

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

  const clear = () => {
    setDataContent({
      name: "",
      max_quantity: 0,
      tags_ids: [],
      search_engines_ids: [],
      platforms_ids: [],
    });
    selectRef.current.clearValue();
    selectRef2.current.clearValue();
    selectRef3.current.clearValue();
  };

  const onSubmit = () => {
    if (DataContent.name === "") {
      alert("name");
      return;
    }
    if (DataContent.max_quantity === 0) {
      alert("quantity");
      return;
    }

    try {
      const getScenariosdt = async () => {
        const data = await postProfiles(DataContent);
        if (data.status === 200) {
          clear();
          getProfiles().then((res) => dispatch(setProfiles(res.data)));
        }
      };
      getScenariosdt();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setDataContent((e) => ({
      ...e,
      tags_ids: selectedTags.map((el) => el.value),
    }));
    setDataContent((e) => ({
      ...e,
      platforms_ids: selectedPlatforms.map((el) => el.value),
    }));
    setDataContent((e) => ({
      ...e,
      search_engines_ids: selectedEngines.map((el) => el.value),
    }));
    setDataContent((e) => ({
      ...e,
      browser: selectedBrowsers.label,
    }));
  }, [selectedTags, selectedPlatforms, selectedEngines, selectedBrowsers]);

  return (
    <div
      className={cn(s.editor, { [s.active]: isActive })}
      onClick={() => setIsActive(!isActive)}
    >
      <div className={s.editorWrapper} onClick={(e) => e.stopPropagation()}>
        <div className={s.title}>Create Profile</div>
        <Input
          label="Name:"
          subtitle="Enter  name."
          placeholder="Enter name"
          value={DataContent.name}
          onChange={(name) => {
            setDataContent((e) => ({ ...e, name: name }));
          }}
        />
        <Input
          label="Limit:"
          type="number"
          subtitle="Enter limit."
          placeholder="Enter limit"
          value={DataContent.max_quantity}
          onChange={(value) => {
            setDataContent((e) => ({ ...e, max_quantity: value }));
          }}
        />
        <div className={s.label}>Tags</div>
        <MultiSelect
          options={tagsItems}
          onChange={setSelectedTags}
          ref={selectRef}
        />
        <div className={s.label}>Platforms:</div>
        <MultiSelect
          options={platfomsItems}
          onChange={setSelectedPlatforms}
          ref={selectRef2}
        />
        <div className={s.label}>Search Engines</div>
        <MultiSelect
          options={enginesItems}
          onChange={setSelectedEngines}
          ref={selectRef3}
        />
        <div className={s.label}>Browsers</div>
        <MultiSelect
          options={browsers.map((el) => ({ value: el, label: el }))}
          onChange={setSelectedBrowsers}
          ref={selectRef4}
          isMulti={false}
        />

        <div className={s.editor_bottons}>
          <button
            className={cn(s.editor_bottons, s.default)}
            onClick={onSubmit}
          >
            Save
          </button>
          <button className={cn(s.editor_bottons, s.dashed)} onClick={clear}>
            {" "}
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};
