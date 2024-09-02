import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./DashService.module.css";
import { getServices } from "../../../redux/actions/serviceActions";
import EditService from "./EditService";

const DashService = () => {
  const dispatch = useDispatch();
  const services = useSelector((state) => state.service.services);
  const [selectedService, setSelectedService] = useState(null);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);

  const handleEdit = (service) => {
    setSelectedService(service);
    setShowEdit(true);
  };

  const handleCancel = () => {
    setSelectedService(null);
    setShowEdit(false);
  };

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
                  <button onClick={() => handleEdit(service)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className={s.btnCreate}>Create</button>
      </div>
      {
        showEdit && (
          <EditService
            service={selectedService}
            handleCancel={handleCancel}
          />
        )
      }
    </div>
  );
};


export default DashService;