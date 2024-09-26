import React from "react";
import s from "./Mision.module.css";
import { TbTargetArrow } from "react-icons/tb";
import { FaRegEye } from "react-icons/fa";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { translations } from "../../../components/translations"; // Importa las traducciones

const Mision = ({ language }) => {
  const t = translations[language]; // Selecciona el idioma adecuado

  return (
    <div className={s.container}>
      <div className={s.divIcon}>
        <TbTargetArrow className={s.icon} />
        <div className={s.divData}>
          <h4>{t.misionObjectiveTitle}</h4> {/* Texto traducido */}
          <p>{t.misionObjectiveDescription}</p>
        </div>
      </div>
      <div className={s.divIcon}>
        <FaRegEye className={s.icon} />
        <div className={s.divData}>
          <h4>{t.misionVisionTitle}</h4>
          <p>{t.misionVisionDescription}</p>
        </div>
      </div>
      <div className={s.divIcon}>
        <MdOutlineWorkspacePremium className={s.icon} />
        <div className={s.divData}>
          <h4>{t.misionValuesTitle}</h4>
          <p>{t.misionValuesDescription}</p>
        </div>
      </div>
    </div>
  );
};

export default Mision;
