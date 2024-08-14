import React from "react";
import s from "./ServiceCard.module.css";

const ServiceCard = ({ service }) => {
  return (
    <div className={s.card}>
      <div className={s.container}>
        <h3>{service.name}</h3>
        <p>{service.description}</p>
      </div>
    </div>
  );
};


export default ServiceCard;