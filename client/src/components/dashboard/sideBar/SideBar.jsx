import React from "react";
import s from "./SideBar.module.css";
import { Link } from "react-router-dom";
import { BsTools } from "react-icons/bs";
import { IoIosHome } from "react-icons/io";

const SideBar = () => {
  return (
    <div className={s.sideBar}>
      <Link>
        <div className={s.divIcon}>
          <IoIosHome className={s.icon} />
          <p>Home</p>
        </div>
      </Link>
      <Link to={'services'}>
        <div className={s.divIcon}>
          <BsTools className={s.icon} />
          <p>Services</p>
        </div>
      </Link>
    </div>
  );
};


export default SideBar;