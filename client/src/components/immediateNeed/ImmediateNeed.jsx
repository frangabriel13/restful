import React from "react";
import s from "./ImmediateNeed.module.css";
import { useNavigate } from "react-router-dom";
import { scrollToSection } from "../../utils/utilities";
import { translations } from "../../components/translations"; // Importa las traducciones

const ImmediateNeed = ({ language }) => {
  const navigate = useNavigate();

  const handleContactClick = () => {
    scrollToSection("contact");
    navigate("/contact");
  };

  const t = translations[language]; // Selecciona el idioma adecuado

  return (
    <div className={s.container}>
      <div className={s.divTitle}>
        <h2>{t.immediateNeedTitle}</h2>
      </div>
      <div className={s.description}>
        <h3>{t.immediateNeedSubtitle}</h3>
        <p>{t.immediateNeedDescription}</p>
      </div>
      <div className={s.divSteps}>
        <h4>{t.immediateNeedStepsTitle}</h4>
        <div className={s.step}>
          <h5>{t.immediateNeedStep1Title}</h5>
          <p>{t.immediateNeedStep1Description}</p>
        </div>
        <div className={s.step}>
          <h5>{t.immediateNeedStep2Title}</h5>
          <p>{t.immediateNeedStep2Description}</p>
        </div>
        <div className={s.step}>
          <h5>{t.immediateNeedStep3Title}</h5>
          <p>{t.immediateNeedStep3Description}</p>
        </div>
        <div className={s.step}>
          <h5>{t.immediateNeedStep4Title}</h5>
          <p>{t.immediateNeedStep4Description}</p>
        </div>
        <div className={s.step}>
          <h5>{t.immediateNeedStep5Title}</h5>
          <p>{t.immediateNeedStep5Description}</p>
        </div>
        <div className={s.step}>
          <h5>{t.immediateNeedStep6Title}</h5>
          <p>{t.immediateNeedStep6Description}</p>
        </div>
      </div>
      <div className={s.callToAction}>
        <h3>{t.immediateNeedCallToAction}</h3>
        <button onClick={handleContactClick}>{t.immediateNeedButton}</button>
      </div>
    </div>
  );
};

export default ImmediateNeed;
