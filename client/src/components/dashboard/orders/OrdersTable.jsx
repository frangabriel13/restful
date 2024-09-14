import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./OrdersTable.module.css";
import { getOrders } from "../../../redux/actions/orderActions";

const OrdersTable = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  console.log(orders);

  const formatDate = (dateString) => {
    return dateString.split('T')[0];
  };

  return (
    <div className={s.dashboard}>
      <h2>Orders</h2>
      <table className={s.table}>
        <thead>
          <tr>
            <th>Status</th>
            <th>Contact Day</th>
            <th>Insurance</th>
            <th>Service Name</th>
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
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.status}</td>
              <td>{formatDate(order.statusDate.date)} by {order.statusDate.updatedBy}</td>
              <td>{order.insurance}</td>
              <td>{order.service ? order.service.name : 'N/A'}</td>
              <td>{order.price}</td>
              <td>{order.contactName}</td>
              <td>{order.phoneNumber}</td>
              <td>{order.email}</td>
              <td>{order.relationship}</td>
              <td>{order.deceasedName}</td>
              <td>{order.age}</td>
              <td>{order.source}</td>
              <td>{order.comission.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
};


export default OrdersTable;