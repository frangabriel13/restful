import React from "react";
import { Routes, Route } from "react-router-dom";
import s from "./Dashboard.module.css";
import SideBar from "./sideBar/SideBar";
import DashService from "./dashService/DashService";
import Management from "./management/Management";
import FuneralHome from "./funeralHome/FuneralHome";
import Users from "./users/Users";

const Dashboard = () => {
  return (
    <div className={s.container}>
      <SideBar />
      <div className={s.dashboard}>
        <Routes>
          <Route path="services" element={<DashService />} />
          <Route path="orders" element={<Management />} />
          <Route path="funeral-homes" element={<FuneralHome />} />
          <Route path="users" element={<Users />} />
        </Routes>
      </div>
    </div>
  );
};


export default Dashboard;