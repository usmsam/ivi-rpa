import controlIcon from "../../controlIcon.svg";
import settingsIcon from "../../settings.png";
import logoutIcon from "../../logout.png";
import "./sidebar.scss";
import { SiTraefikproxy } from "react-icons/si";
import { IoMdSettings } from "react-icons/io";
import { ImExit } from "react-icons/im";
import { AiFillControl } from "react-icons/ai";
import { Link, BrowserRouter as Router, Route, Routes } from "react-router-dom";
export const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="title">IVI RPA</div>
      <ul className="links">
        <Link to={"/"}>
          <li className="linkItem">
            <AiFillControl />
            Управление
          </li>
        </Link>
        <Link to={"/settings"}>
          <li className="linkItem">
            <IoMdSettings /> Настройки
          </li>
        </Link>
        <Link to={"/proxy"}>
          <li className="linkItem">
            <SiTraefikproxy />
            Прокси
          </li>
        </Link>
      </ul>
      <Link to={"/"}>
        <li className="linkItem">
          <ImExit />
          Выход
        </li>
      </Link>
      <div className="middle"></div>
      <p className="bottomText">ООО “IVI RPA”</p>
    </div>
  );
};
