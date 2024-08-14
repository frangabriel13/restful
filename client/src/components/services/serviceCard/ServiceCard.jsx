import React from "react";
import s from "./ServiceCard.module.css";
import { servicesImages } from "../../../utils/utilities";

const ServiceCard = ({ service }) => {
  return (
    <div className={s.card}>
      {
        servicesImages && (
          <div className={s.divImg}>
            <img 
              src={servicesImages.find(img => img.id === service.id)?.image} 
              alt={service.name} 
            />
          </div>
        )
      }
      <div className={s.divDataContainer}>
        <div className={s.dataContainer}>
          <div className={s.divData}>
            <h3>{service.name}</h3>
            <p>{service.description}</p>
          </div>
          <div className={s.divFeatures}>
            <h4>Beneficios:</h4>
            <ul>
              {
                service.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))
              }
            </ul>
          </div>
        </div>
        <div className={s.divMoreInfo}>
          <button>Más información</button>
        </div>
      </div>
    </div>
  );
};


export default ServiceCard;