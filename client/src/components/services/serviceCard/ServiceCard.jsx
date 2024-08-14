import React from "react";
import s from "./ServiceCard.module.css";
import { servicesImages } from "../../../utils/utilities";

const ServiceCard = ({ service }) => {
  return (
    <div className={s.card}>
      {
        servicesImages && (
          <div>
            <img 
              src={servicesImages.find(img => img.id === service.id)?.image} 
              alt={service.name} 
            />
          </div>
        )
      }
      <div className={s.container}>
        <h3>{service.name}</h3>
        <p>{service.description}</p>
      </div>
    </div>
  );
};


export default ServiceCard;