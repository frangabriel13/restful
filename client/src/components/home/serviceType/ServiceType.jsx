import React from "react";
import s from "./ServiceType.module.css";
import { Link } from "react-router-dom";
import { scrollToSection } from "../../../utils/utilities";
import { translations } from "../../../components/translations"; // Importa las traducciones

const ServiceType = ({ language }) => {
  const handleScroll = () => {
    scrollToSection("services");
  };

  const t = translations[language]; // Selecciona el idioma adecuado

  return (
    <div className={s.container}>
      <h3>{t.serviceTypeTitle}</h3> {/* Título traducido */}
      <p>{t.serviceTypeDescription}</p> {/* Descripción traducida */}
      <Link to="/services" onClick={handleScroll}>
        <button>{t.serviceTypeButton}</button> {/* Botón traducido */}
      </Link>
    </div>
  );
};

export default ServiceType;
