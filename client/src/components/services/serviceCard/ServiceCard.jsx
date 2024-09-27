import React from "react";
import s from "./ServiceCard.module.css";
import { servicesImages } from "../../../utils/utilities";
import { scrollToSection } from "../../../utils/utilities";
import { useNavigate } from "react-router-dom";

const ServiceCard = ({ service, language }) => {
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
              alt={service.name[language]} 
            />
          </div>
        )
      }
      <div className={s.divDataContainer}>
        <div className={s.containerData}>
          <div className={s.dataContainer}>
            <div className={s.divData}>
              <h3>{service.name[language]}</h3> {/* Título según el idioma */}
              <p>{service.description[language]}</p> {/* Descripción según el idioma */}
            </div>
            <div className={s.divFeatures}>
              <h4>{language === 'es' ? 'Beneficios:' : 'Features:'}</h4>
              <ul>
                {
                  service.features[language].map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))
                }
              </ul>
            </div>
          </div>
          <div className={s.divDisclaimer}>
            <p>* {service.disclaimers[language]}</p> {/* Aviso legal según el idioma */}
          </div>
        </div>
        <div className={s.divMoreInfo}>
          <button onClick={handleScroll}>{language === 'es' ? 'Más información' : 'More information'}</button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
