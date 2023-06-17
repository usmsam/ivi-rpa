import { SiTraefikproxy } from "react-icons/si";
import { IoMdSettings } from "react-icons/io";
import { TbWorldWww } from "react-icons/tb";
import { ImExit } from "react-icons/im";
import { Link, useLocation } from "react-router-dom";
import { AiFillControl } from "react-icons/ai";
import { FaUser } from "react-icons/fa";

import s from "./sidebar.module.scss";
import cn from "classnames";

export const Sidebar = () => {
  const { pathname } = useLocation();
  return (
    <div className={s.sidebar}>
      <div className={s.title}>IVI RPA</div>
      <ul className={s.links}>
        <Link to={"/"}>
          <li className={cn(s.linkItem, { [s.active]: pathname === "/" })}>
            <AiFillControl />
            Сценарии
          </li>
        </Link>
        <Link to={"/profiles"}>
          <li
            className={cn(s.linkItem, { [s.active]: pathname === "/profiles" })}
          >
            <FaUser />
            Профили
          </li>
        </Link>
        <Link to={"/settings"}>
          <li
            className={cn(s.linkItem, { [s.active]: pathname === "/settings" })}
          >
            <IoMdSettings /> Настройки
          </li>
        </Link>
        <Link to={"/proxy"}>
          <li className={cn(s.linkItem, { [s.active]: pathname === "/proxy" })}>
            <SiTraefikproxy />
            Прокси
          </li>
        </Link>
        <Link to={"/sites"}>
          <li className={cn(s.linkItem, { [s.active]: pathname === "/proxy" })}>
            <TbWorldWww />
            Сайты
          </li>
        </Link>
      </ul>
      <Link to={"/"}>
        <li className={s.linkItem}>
          <ImExit />
          Выход
        </li>
      </Link>
      <div className={s.middle}></div>
      <p className={s.bottomText}>ООО “IVI RPA”</p>
    </div>
  );
};
