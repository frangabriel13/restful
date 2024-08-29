import React from "react";
import s from "./ServiceCard.module.css";
import { servicesImages } from "../../../utils/utilities";
import { scrollToSection } from "../../../utils/utilities";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ServiceCard = ({ service }) => {
  const navigate = useNavigate();

  const handleScroll = () => {
    scrollToSection('contact');
    navigate("/contact");
  };

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
        <div className={s.containerData}>
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
          <div className={s.divDisclaimer}>
            <p>* {service.disclaimers}</p>
          </div>
        </div>
        <div className={s.divMoreInfo}>
          <button onClick={handleScroll}>Más información</button>
          {/* <Link to="/services" onClick={handleScroll}>
            <button>Más información</button>
          </Link> */}
        </div>
      </div>
    </div>
  );
};


export default ServiceCard;