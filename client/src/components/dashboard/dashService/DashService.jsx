import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./DashService.module.css";
import { getServices } from "../../../redux/actions/serviceActions";

const DashService = () => {
  const dispatch = useDispatch();
  const services = useSelector((state) => state.service.services);

  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);

  console.log(services);

  return (
    <div className={s.container}>
      <div className={s.dashboard}>
        <h2>Services</h2>
      </div>
    </div>
  );
};


export default DashService;