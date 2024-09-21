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
          <h3>PREVISION FUNERARIA </h3>
          <h3>¿Por qué es importante prepararnos?
          </h3>
          <p>
              Contar con un plan funerario de prevención es de suma importancia, ya que representa un alivio para el futuro, para esos momentos difíciles, asi mismo se esta garantizando que los deseos y necesidades de los clientes se cumplan de manera respetuosa y efectiva en el momento adecuado.
              En los planes de prevención las personas tienen la facultad de decidir con antelación los detalles de su propio servicio o el de un ser querido, asegurando que todo se maneje según sus deseos.
              Esta planificación previa alivia la carga emocional y financiera de las familias en momentos difíciles, permitiendo que se tomen decisiones meditadas y personalizadas.

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
        <h1>A tener en cuenta</h1>
        <br />
       <h2>Si el fallecimiento ocurre fuera de Estados Unidos y/o el servicio se brinda en alguna otra funeraria por desconocimiento de la familia, con el acta de defuncion se realiza el tramite pertinente y recupera el dinero pagado.
       </h2>
       <br />
        <h3>Anticipate al futuro, es momento de prevenir. Contactanos para mas información.
        </h3>
        <button onClick={handleContactClick}>Contacta</button>
      </div>
    </div>
  )
};


export default FuturePlanning;