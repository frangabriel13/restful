import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./Orders.module.css";
import OrdersTable from "./OrdersTable";
import CreateOrder from "./CreateOrder";

const Orders = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={s.container}>
      <OrdersTable openModal={handleModalOpen} />
      {/* <CreateOrder /> */}
      {isModalOpen && <CreateOrder closeModal={handleModalClose} />}
    </div>
  );
};


export default Orders;