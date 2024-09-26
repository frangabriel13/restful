import React from "react";
import s from "./ToAbout.module.css";
import { Link } from "react-router-dom";
import { scrollToSection } from "../../../utils/utilities";
import { translations } from "../../../components/translations"; // Importa las traducciones

const ToAbout = ({ language }) => {
  const handleScroll = () => {
    scrollToSection("about");
  };

  const t = translations[language]; // Selecciona el idioma adecuado

  return (
    <div className={s.container}>
      <h3>{t.toAboutTitle}</h3> {/* Texto traducido */}
      <Link to="/about" onClick={handleScroll}>
        <button>{t.toAboutButton}</button> {/* Botón traducido */}
      </Link>
    </div>
  );
};

export default ToAbout;
