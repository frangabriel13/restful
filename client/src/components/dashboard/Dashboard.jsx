import React from "react";
import { Routes, Route } from "react-router-dom";
import s from "./Dashboard.module.css";
import SideBar from "./sideBar/SideBar";
import DashService from "./dashService/DashService";

const Dashboard = () => {
  return (
    <div className={s.container}>
      <SideBar />
      <div className={s.dashboard}>
        <Routes>
          <Route path="services" element={<DashService />} />
        </Routes>
      </div>
    </div>
  );
};


export default Dashboard;