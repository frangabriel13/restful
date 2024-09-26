import React from "react";
import s from "./Home.module.css";
import fondo from "../../assets/fondoJarron.jpg";
import ToAbout from "./toAbout/ToAbout";
import Redirect from "./redirect/Redirect";
import ServiceType from "./serviceType/ServiceType";
import { Link } from "react-router-dom";
import ToContact from "./toContact/ToContact";
import { scrollToSection } from "../../utils/utilities";
import { translations } from "../../components/translations"; // Importa las traducciones

const Home = ({ language }) => {
  const handleScroll = () => {
    scrollToSection("contact");
  };

  const t = translations[language]; // Selecciona el idioma adecuado

  return (
    <div>
      <div className={s.container}>
        <div className={s.divContainer}>
          <div className={s.divData}>
            <h1>{t.homeTitle}</h1> {/* Título traducido */}
            <p>{t.homeDescription}</p> {/* Descripción traducida */}
          </div>
          <div className={s.divContact}>
            <h2>{t.homeHelpTitle}</h2>
            <p>{t.homeHelpDescription}</p>
            <Link to="/contact" className={s.link} onClick={handleScroll}> 
              <button className={s.button}>{t.homeButton}</button> {/* Botón traducido */}
            </Link>
          </div>
        </div>
      </div>
      <div>
        <ToAbout language={language} />
        <Redirect language={language} />
        <ServiceType language={language} />
        <ToContact language={language} />
      </div>
    </div>
  );
};

export default Home;
