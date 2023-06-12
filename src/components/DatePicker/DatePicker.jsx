import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import s from "./datePicker.module.scss";

export const DatePicker = ({ startDate, setStartDate }) => {
  return (
    <ReactDatePicker
      className={s.datepicker}
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      peekNextMonth
      showMonthDropdown
      showYearDropdown
      dropdownMode="select"
      dateFormat="dd/MM/yy"
    />
  );
};
