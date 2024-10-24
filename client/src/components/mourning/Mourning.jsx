import React from "react";
import s from "./Mourning.module.css";
import { translations } from "../translations"; // Importa las traducciones

const Mourning = ({ language }) => {
  const t = translations[language]; // Selecciona el idioma adecuado

  return (
    <div id="mourning" className={s.container}>
      <div className={s.divTitle}>
        <h2>{t.mourningTitle}</h2> {/* Título traducido */}
      </div>
      <div className={s.description}>
        <p className={s.peel}>{t.mourningDescription}</p> {/* Descripción traducida */}
      </div>
      <div className={s.divMourning}>
        <h3>{t.mourningStagesTitle}</h3> {/* Título de las etapas traducido */}
        <div className={s.divStages}>
          <div className={s.stage}>
            <h4>{t.mourningStage1Title}</h4>
            <p>{t.mourningStage1Description}</p>
          </div>
          <div className={s.stage}>
            <h4>{t.mourningStage2Title}</h4>
            <p>{t.mourningStage2Description}</p>
          </div>
          <div className={s.stage}>
            <h4>{t.mourningStage3Title}</h4>
            <p>{t.mourningStage3Description}</p>
          </div>
          <div className={s.stage}>
            <h4>{t.mourningStage4Title}</h4>
            <p>{t.mourningStage4Description}</p>
          </div>
          <div className={`${s.stage} ${s.stage5}`}>
            <h4>{t.mourningStage5Title}</h4>
            <p>{t.mourningStage5Description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mourning;
