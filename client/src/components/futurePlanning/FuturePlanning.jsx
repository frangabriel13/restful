import React from "react";
import s from "./FuturePlanning.module.css";
import Benefits from "./benefits/Benefits";
import Gallery from "./gallery/Gallery";
import { benfitsImages } from "../../utils/utilities";
import { useNavigate } from "react-router-dom";
import { scrollToSection } from "../../utils/utilities";

const FuturePlanning = () => {
  const navigate = useNavigate();

  const handleContactClick = () => {
    scrollToSection("contact");
    navigate("/contact");
  };

  return (
    <div className={s.container}>
      <div className={s.divFuture}>
        <div className={s.divTitle}>
          <h2>Planes a futuro</h2>
        </div>
        <div className={s.description}>
          <h3>Qué son los planes a futuro?</h3>
          <p>
            Los planes futuros en una funeraria son estrategias y servicios anticipados diseñados para garantizar que los deseos 
            y necesidades de los clientes se cumplan de manera respetuosa y efectiva en el momento adecuado. 
            Estos planes incluyen la pre-planificación de funerales, donde las personas pueden decidir con antelación los detalles 
            de su propio funeral o el de un ser querido, asegurando que todo se maneje según sus preferencias. 
            Esta planificación previa alivia la carga emocional y financiera de las familias en momentos difíciles, 
            permitiendo que se tomen decisiones meditadas y personalizadas. Además, las funerarias también desarrollan planes 
            a largo plazo para mejorar sus servicios, expandir su alcance y adaptarse a las nuevas tendencias y 
            necesidades del sector, siempre con el objetivo de proporcionar un apoyo integral y de alta calidad a las comunidades que sirven.
          </p>
        </div>
      </div>
      <div className={s.sectionTwo}>
        <div>
          <Benefits />
        </div>
        <div>
          <Gallery images={benfitsImages} />
        </div>
      </div>
      <div className={s.callToAction}>
        <h3>Contáctate con nosotros para mas información</h3>
        <button onClick={handleContactClick}>Contacta</button>
      </div>
    </div>
  )
};


export default FuturePlanning;