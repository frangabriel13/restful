import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./Orders.module.css";
import OrdersTable from "./OrdersTable";
import CreateOrder from "./CreateOrder";
import EditOrder from "./EditOrder";

const Orders = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const handleCreate = () => {
    setShowCreate(true);
    setShowEdit(false);
  };

  const handleEdit = () => {
    setShowEdit(true);
    setShowCreate(false);
  };

  return (
    <div className={s.container}>
      <div>
        <h2>Orders</h2>
        <button onClick={handleCreate}>Create Order</button>
      </div>
      <OrdersTable onEditClick={handleEdit} />
      { showCreate && <CreateOrder /> }
      { showEdit && <EditOrder /> }
    </div>
  );
};


export default Orders;