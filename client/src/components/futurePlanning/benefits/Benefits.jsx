import React from "react";
import s from "./Benefits.module.css";
import { TiTickOutline } from "react-icons/ti";
import { translations } from "../../../components/translations"; // Importa las traducciones

const Benefits = ({ language }) => {
  const t = translations[language]; // Selecciona el idioma adecuado

  return (
    <div className={s.container}>
      <h3>{t.benefitsTitle}</h3> {/* Título traducido */}
      <div className={s.divBenefits}>
        <div className={s.benefit}>
          <TiTickOutline className={s.icon} />
          <p>{t.benefit1}</p> {/* Texto traducido */}
        </div>
        <div className={s.benefit}>
          <TiTickOutline className={s.icon} />
          <p>{t.benefit2}</p>
        </div>
        <div className={s.benefit}>
          <TiTickOutline className={s.icon} />
          <p>{t.benefit3}</p>
        </div>
        <div className={s.benefit}>
          <TiTickOutline className={s.icon} />
          <p>{t.benefit4}</p>
        </div>
        <div className={s.benefit}>
          <TiTickOutline className={s.icon} />
          <p>{t.benefit5}</p>
        </div>
        <div className={s.benefit}>
          <TiTickOutline className={s.icon} />
          <p>{t.benefit6}</p>
        </div>
        <div className={s.benefit}>
          <TiTickOutline className={s.icon} />
          <p>{t.benefit7}</p>
        </div>
      </div>
    </div>
  );
};

export default Benefits;
