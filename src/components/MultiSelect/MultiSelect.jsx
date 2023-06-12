import { forwardRef } from "react";
import Select from "react-select";
// import makeAnimated from "react-select/animated";
import s from "./multiSelect.module.scss";
// const animatedComponents = makeAnimated();
export const MultiSelect = forwardRef(
  (
    {
      options = [],
      onChange = () => {},
      isMulti = true,
      onInputChange = () => {},
    },
    ref
  ) => {
    return (
      <>
        <Select
          isMulti={isMulti}
          options={options}
          className={s.select}
          onChange={onChange}
          onInputChange={onInputChange}
          ref={ref}
          styles={{
            input: (styles, { data }) => {
              return {
                ...styles,
                color: "#fff",
              };
            },
            container: (styles, { data }) => {
              return {
                ...styles,
                background: "#4C4A66",
                height: 42,
              };
            },
            control: (styles, { data }) => {
              return {
                ...styles,
                boxShadow: "none",
              };
            },
            singleValue: (styles, { data }) => {
              return {
                ...styles,
                color: "#fff",
              };
            },
          }}
        />
      </>
    );
  }
);
