import Select from "react-select";
import makeAnimated from "react-select/animated";
import s from "./multiSelect.module.scss";
const animatedComponents = makeAnimated();

export const MultiSelect = ({ options = [] }) => {
  return (
    <>
      <Select
        closeMenuOnSelect={false}
        components={animatedComponents}
        isMulti
        options={options}
        className={s.select}
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
};
