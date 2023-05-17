import { forwardRef } from "react";
import Select from "react-select";
// import makeAnimated from "react-select/animated";
import s from "./multiSelect.module.scss";
// const animatedComponents = makeAnimated();
export const MultiSelect = forwardRef(
  ({ options = [], onChange = () => {} }, ref) => {
    return (
      <>
        <Select
          // closeMenuOnSelect={false}
          // components={animatedComponents}
          isMulti
          options={options}
          className={s.select}
          onChange={onChange}
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
          }}
        />
      </>
    );
  }
);
