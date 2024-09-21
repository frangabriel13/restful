import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./Orders.module.css";
import OrdersTable from "./OrdersTable";
import CreateOrder from "./CreateOrder";

const Orders = () => {
  return (
    <div className={s.container}>
      <OrdersTable />
      <CreateOrder />
    </div>
  );
};


export default Orders;