import React from "react";
import s from "./Benefits.module.css";
import { TiTickOutline } from "react-icons/ti";

const Benefits = () => {
  return (
    <div className={s.container}>
      <h3>Beneficios</h3>
      <div className={s.divBenefits}>
        <div className={s.benefit}>
          <TiTickOutline className={s.icon} />
          <p>Planificación personalizada</p>
        </div>
        <div className={s.benefit}>
          <TiTickOutline className={s.icon} />
          <p>Alivio de la carga emocional</p>
        </div>
        <div className={s.benefit}>
          <TiTickOutline className={s.icon} />
          <p>Reducción de costos</p>
        </div>
        <div className={s.benefit}>
          <TiTickOutline className={s.icon} />
          <p>Evita decisiones apresuradas</p>
        </div>
        <div className={s.benefit}>
          <TiTickOutline className={s.icon} />
          <p>Apoyo integral a las familias</p>
        </div>
        <div className={s.benefit}>
          <TiTickOutline className={s.icon} />
          <p>Cumplimiento del deseo del fallecido</p>
        </div>
      </div>
    </div>
  )
};


export default Benefits;