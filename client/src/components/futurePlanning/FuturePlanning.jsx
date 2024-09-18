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
            En <strong>Eternal Restful Funeral Services</strong>, comprendemos la importancia de anticiparse a las necesidades y deseos de nuestros clientes, asegurando que cada detalle se maneje con la mayor dignidad y respeto en el momento adecuado. Nuestros planes futuros incluyen la pre-planificación funeraria, una estrategia clave que permite a las personas decidir con antelación todos los aspectos de su propio funeral o el de un ser querido. Este enfoque garantiza que cada ceremonia se lleve a cabo conforme a los deseos específicos del individuo, aliviando así la carga emocional y financiera que recae sobre las familias en tiempos difíciles. La planificación previa no solo ofrece tranquilidad a nuestros clientes, sino que también facilita decisiones meditadas y personalizadas, adaptadas a sus valores y preferencias. Además, en <strong>Eternal Restful</strong>, estamos comprometidos con la mejora continua de nuestros servicios y la expansión de nuestro alcance. Nos mantenemos a la vanguardia de las tendencias y necesidades del sector funerario, desarrollando planes a largo plazo que nos permiten proporcionar un apoyo integral y de alta calidad a las comunidades a las que servimos.
          </p>
        </div>
      </div>
      <div className={s.conversationSection}>
        <h3>Iniciar la conversación</h3>
        <p>
          No siempre es fácil hablar con su familia acerca de los planes funerarios de pre-necesidad. Contarles acerca de los planes de usted o sugerirles que hagan planes para sí mismos puede ser incómodo. Una manera de hacer que la conversación sea menos difícil es recurrir a planes pre-necesidad como un medio para que todos estén preparados con anticipación. Acuerde un momento cuando su familia pueda reunirse en un lugar cómodo y permita que sus seres queridos compartan sus opiniones acerca de sus planes.
        </p>
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
        <h3>Contáctate con nosotros para más información</h3>
        <button onClick={handleContactClick}>Contacta</button>
      </div>
    </div>
  );
};

export default FuturePlanning;
