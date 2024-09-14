import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./Orders.module.css";
import OrdersTable from "./OrdersTable";
import CreateOrder from "./CreateOrder";
import EditOrder from "./EditOrder";

const Orders = () => {
  const [showEdit, setShowEdit] = useState(false);

  const handleEdit = () => {
    setShowEdit(true);
  };

  return (
    <div className={s.container}>
      <div className={s.divOrders}>
        <h2>Orders</h2>
      </div>
      <OrdersTable onEditClick={handleEdit} />
      <CreateOrder />
      { showEdit && <EditOrder /> }
    </div>
  );
};


export default Orders;