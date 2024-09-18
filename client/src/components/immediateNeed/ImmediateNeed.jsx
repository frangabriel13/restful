import React from "react";
import s from "./ImmediateNeed.module.css";
import { useNavigate } from "react-router-dom";
import { scrollToSection } from "../../utils/utilities";
import Instructions from "./Instructions";


const ImmediateNeed = () => {
  const navigate = useNavigate();

  const handleContactClick = () => {
    scrollToSection("contact");
    navigate("/contact");
  };

  return (
    <div className={s.container}>
      <div className={s.divTitle}>
        <h2>Obtenga Ayuda Ahora</h2>
      </div>
      <div className={s.description}>
        <h3>Qué hacer en caso de fallecimiento?</h3>
        <p>
          En momentos difíciles, es importante saber qué pasos tomar. A continuación, te guiamos a través de las acciones inmediatas 
          que debes realizar tras el fallecimiento de un ser querido.
        </p>
      </div>
      <div className={s.divSteps}>

        <Instructions />

      </div>
      <div className={s.callToAction}>
        <h3>Contáctate con nosotros para mas información</h3>
        <button onClick={handleContactClick}>Contacta</button>
      </div>
    </div>
  )
};


export default ImmediateNeed;