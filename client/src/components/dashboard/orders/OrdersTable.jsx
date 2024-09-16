import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./OrdersTable.module.css";
import { getOrders } from "../../../redux/actions/orderActions";
import { getFuneralHomes } from "../../../redux/actions/funeralHomeActions";
import { getServices, deleteService } from "../../../redux/actions/serviceActions";
import { getUsers } from "../../../redux/actions/userActions";
import EditOrder from "./EditOrder";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

const OrdersTable = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders);
  const funeralHomes = useSelector((state) => state.funeralHome.funeralHomes);
  const services = useSelector((state) => state.service.services);
  const users = useSelector((state) => state.user.users);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(false);

  useEffect(() => {
    dispatch(getOrders());
    dispatch(getFuneralHomes());
    dispatch(getServices());
    dispatch(getUsers());
  }, [dispatch]);

  const getFuneralHomeName = (id) => {
    const home = funeralHomes.find((home) => home.id === id);
    return home ? home.name : "N/A";
  };

  const getServiceName = (id) => {
    const service = services.find((service) => service.id === id);
    return service ? service.name : "N/A";
  };

  const getUserName = (id) => {
    const user = users.find((user) => user.id === id);
    return user ? user.name : "N/A";
  };

  const formatDate = (dateString) => {
    return dateString.split('T')[0];
  };

  const handleEdit = (order) => {
    setSelectedOrder(order);
    setShowEdit(!showEdit);
  };

  return (
    <div className={s.dashboard}>
      <h2>Orders</h2>
      <table className={s.table}>
        <thead>
          <tr>
          <th>Status</th>
            <th>Contact Day</th>
            <th>Updates</th>
            <th>Insurance</th>
            <th>Funeral Home</th>
            <th>Tracking</th>
            <th>Price</th>
            <th>Contact Name</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Relationship</th>
            <th>Service Type</th>
            <th>Deceased Name</th>
            <th>Age</th>
            <th>Source</th>
            <th>Assigned</th>
            <th>Comission</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.status}</td>
              <td>{formatDate(order.statusDate.date)} by {order.statusDate.updatedBy}</td>
              <td>{order.insurance}</td>
              <td>{getFuneralHomeName(order.funeralHomeId)}</td>
              <td>
                <ul>
                  {order.tracking.map((track, index) => (
                    <li key={index}>{track}</li>
                  ))}
                </ul>
               </td>
              <td>{order.price}</td>
              <td>{order.contactName}</td>
              <td>{order.phoneNumber}</td>
              <td>{order.email}</td>
              <td>{order.relationship}</td>
              <td>{getServiceName(order.serviceId)}</td>
              <td>{order.deceasedName}</td>
              <td>{order.age}</td>
              <td>{order.source}</td>
              <td>{getUserName(order.userId)}</td>
              <td>{order.comission.join(", ")}</td>
              <td>
                <div className={s.divIcons}>
                  <CiEdit onClick={() => handleEdit(order)} className={s.iconEdit} />
                  <MdDeleteOutline className={s.iconDelete} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showEdit && <EditOrder order={selectedOrder} onClose={() => setShowEdit(false)} />}
    </div>
  );
};

export default OrdersTable;