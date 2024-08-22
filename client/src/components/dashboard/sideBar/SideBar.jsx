import React from "react";
import s from "./SideBar.module.css";
import { Link } from "react-router-dom";
import { BsTools } from "react-icons/bs";
import { IoIosHome } from "react-icons/io";

const SideBar = () => {
  return (
    <div className={s.sideBar}>
      <Link>
        <div>
          <IoIosHome />
          <p>Home</p>
        </div>
      </Link>
      <Link to={'services'}>
        <div>
          <BsTools />
          <p>Services</p>
        </div>
      </Link>
    </div>
  );
};


export default SideBar;