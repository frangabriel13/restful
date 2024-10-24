import React from "react";
import s from "./FuturePlanning.module.css";
import Benefits from "./benefits/Benefits";
import Gallery from "./gallery/Gallery";
import { benfitsImages } from "../../utils/utilities";
import { useNavigate } from "react-router-dom";
import { scrollToSection } from "../../utils/utilities";
import { translations } from "../../components/translations"; // Importa las traducciones

const FuturePlanning = ({ language }) => {
  const navigate = useNavigate();

  const handleContactClick = () => {
    scrollToSection("contact");
    navigate("/contact");
  };

  // Selecciona el idioma adecuado
  const t = translations[language];

  return (
    <div id="future-planning" className={s.container}>
      <div className={s.divFuture}>
        <div className={s.divTitle}>
          <h2>{t.futurePlanningTitle}</h2>
        </div>
        <div className={s.description}>
          <h3>{t.futurePlanningSubtitle1}</h3>
          <h3>{t.futurePlanningSubtitle2}</h3>
          <p>{t.futurePlanningDescription}</p>
        </div>
      </div>
      <div className={s.sectionTwo}>
        <div>
          <Benefits language={language} /> {/* Pasamos el idioma a Benefits */}
        </div>
        <div>
          <Gallery images={benfitsImages} />
        </div>
      </div>
      <div className={s.callToAction}>
        <h1>{t.futurePlanningTakeNote}</h1>
        <br />
        <h2>{t.futurePlanningReminder}</h2>
        <br />
        <h3>{t.futurePlanningCallToAction}</h3>
        <button onClick={handleContactClick}>{t.futurePlanningButton}</button>
      </div>
    </div>
  );
};

export default FuturePlanning;

