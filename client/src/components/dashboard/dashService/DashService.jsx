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

  return (
    <div className={s.container}>
      <div className={s.dashboard}>
        <h2>Services</h2>
        <table className={s.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Service</th>
              <th>Price</th>
              <th>Pre-Need</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service._id}>
                <td>{service.id}</td>
                <td>{service.name}</td>
                <td>${service.price}</td>
                <td>{service.preNeed}</td>
                <td>
                  <button>Edit</button>
                  {/* <button>Delete</button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default DashService;