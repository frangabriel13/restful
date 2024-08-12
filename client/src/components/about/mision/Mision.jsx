import React from "react";
import s from "./Mision.module.css";
import { TbTargetArrow } from "react-icons/tb";
import { FaRegEye } from "react-icons/fa";
import { MdOutlineWorkspacePremium } from "react-icons/md";

const Mision = () => {
  return (
    <div className={s.container}>
      <div className={s.divIcon}>
        <TbTargetArrow className={s.icon} />
        <div className={s.divData}>
          <h4>Nuestro objetivo</h4>
          <p>Entregar a los clientes un servicio de excelencia, acompañándolos en todo momento.</p>
        </div>
      </div>
      <div className={s.divIcon}>
        <FaRegEye className={s.icon} />
        <div className={s.divData}>
          <h4>Nuestra visión</h4>
          <p>Compromiso, respeto, excelencia, innovación, confianza, eficiencia.</p>
        </div>
      </div>
      <div className={s.divIcon}>
        <MdOutlineWorkspacePremium className={s.icon} />
        <div className={s.divData}>
          <h4>Nuestros valores</h4>
          <p>Ser la primera preferencia en la elección de un servicio funerario.</p>
        </div>
      </div>
    </div>
  )
};


export default Mision;