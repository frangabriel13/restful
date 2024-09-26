import React from "react";
import s from "./ToContact.module.css";
import { Link } from "react-router-dom";
import { scrollToSection } from "../../../utils/utilities";
import { translations } from "../../../components/translations"; // Importa las traducciones

const ToContact = ({ language }) => {
  const handleScroll = () => {
    scrollToSection("contact");
  };

  const t = translations[language]; // Selecciona el idioma adecuado

  return (
    <div className={s.container}>
      <h3>{t.toContactTitle}</h3> {/* Título traducido */}
      <Link to="/contact" onClick={handleScroll}>
        <button>{t.toContactButton}</button> {/* Botón traducido */}
      </Link>
    </div>
  );
};

export default ToContact;
