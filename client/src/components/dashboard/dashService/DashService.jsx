import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./DashService.module.css";
import { getServices, deleteService } from "../../../redux/actions/serviceActions";
import EditService from "./EditService";
import CreateService from "./CreateService";

const DashService = () => {
  const dispatch = useDispatch();
  const services = useSelector((state) => state.service.services);
  const [selectedService, setSelectedService] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [showCreate, setShowCreate] = useState(false);

  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);

  const handleEdit = (service) => {
    setSelectedService(service);
    setShowEdit(true);
  };

  const handleCreate = () => {
    setShowCreate(true);
  };

  const handleCancel = () => {
    setSelectedService(null);
    setShowEdit(false);
  };

  const handleDelete = (id) => {
    dispatch(deleteService(id));
  };

  console.log(services);

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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service._id}>
                <td>{service.id}</td>
                <td>{service.name.en}</td>
                <td>${service.price}</td>
                <td className={s.btnCell}>
                  <button onClick={() => handleEdit(service)}>Edit</button>
                  <button className={s.btnDelete} onClick={() => handleDelete(service.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={s.btnCreateContainer}>
          <button className={s.btnCreate} onClick={handleCreate}>Create</button>
        </div>
      </div>
      {
        showEdit && (
          <EditService
            service={selectedService}
            handleCancel={handleCancel}
          />
        )
      }
      {
        showCreate && (
          <CreateService handleCancel={() => setShowCreate(false)} />
        )
      }
    </div>
  );
};


export default DashService;