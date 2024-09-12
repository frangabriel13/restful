import React from "react";
import s from "./SideBar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { BsTools } from "react-icons/bs";
import { IoIosHome } from "react-icons/io";
import { FaClipboardList } from "react-icons/fa";
import { FaCross } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/actions/authActions";

const SideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/dashboard/login");
  };

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
      <Link to={'orders'}>
        <div className={s.divIcon}>
          <FaClipboardList className={s.icon} />
          <p>Orders</p>
        </div>
      </Link>
      <Link to={'funeral-homes'}>
        <div className={s.divIcon}>
          <FaCross className={s.icon} />
          <p>Funeral Home</p>
        </div>
      </Link>
      <Link to={'users'}>
        <div className={s.divIcon}>
          <FaUserFriends className={s.icon} />
          <p>Users</p>
        </div>
      </Link>
      <div className={s.divIcon} onClick={handleLogout}>
        <MdLogout className={s.icon} />
        <p>Logout</p>
      </div>
    </div>
  );
};


export default SideBar;