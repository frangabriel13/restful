import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./Orders.module.css";
import { getOrders } from "../../../redux/actions/orderActions";

const OrdersTable = () => {
  const dispatch = useDispatch();
  // const orders = useSelector(state => state.order.orders);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  return (
    <div className={s.container}>
      <h2>Tabla</h2>
    </div>
  )
};


export default OrdersTable;