import React from "react";
import s from "./About.module.css";
import about from "../../assets/aboutImg.jpg";
import Mision from "./mision/Mision";
import { useNavigate } from "react-router-dom";
import { scrollToSection } from "../../utils/utilities";

const About = () => {
  const navigate = useNavigate();

  const handleContactClick = () => {
    scrollToSection("contact");
    navigate("/contact");
  };

  return (
    <div className={s.container}>
      <div className={s.about}>
        <div className={s.divTitle}>
          <h2>Quiénes somos?</h2>
        </div>
        <div className={s.divData}>
          <div className={s.description}>
            <h3>Eternal Restful Funeral Services</h3>
            <p>
            En Eternal Restful somos mas que una agencia de servicios funerales, estamos sumamente comprometidos en cobijarte en el proceso de elección de tu plan funeral, nos dedicamos a acompañar a las familias en cada paso del proceso,  asegurando que cada detalle se maneje con la mayor delicadeza y consideración.  Tu plan funeral de prevención para el futuro.
           </p>
           <br />
           <br />
           <h1> Anticipate al futuro es momento de prevenir.</h1>
           <br />
           <br />
           <h1>¿Por qué elegir Eternal Restful?</h1>
           <br />
           <br />
           <p>
           Estamos conscientes que los imprevistos ocurren de un momento a otro, por ello dentro de nuestros servicios, contamos con planes de necesidad inmediata, ofrecemos apoyo integral y respetuoso en los momentos mas difíciles.

           </p>
           <br />
           <br />
           <h1>¿Qué hacemos?</h1>
           <br />
           <br />
           <p>
           Nuestro principal objetivo es aliviar la carga emocional durante este tiempo, proporcionando un ambiente de paz y confort, donde los seres queridos puedan despedirse de manera digna y serena. Con un equipo experimentado y compasivo, en Eternal Restful nos enorgullece ofrecer un servicio personalizado, adaptado a las necesidades y deseos de cada familia, garantizando que el homenaje a la vida de su ser querido o de usted mismo sea un reflejo auténtico de su legado.

           </p>
          </div>

          <div>

            <img src={about} alt="About" />
          </div>
        </div>

      </div>
 
      <div className={s.description}>
            <p>
            Tenemos cobertura en todo California, respaldados por mas de 15 años de experiencia con el reconocimiento de nuestro servicio cálido y experto, con una trayectoria que refleja profesionalismo y sensibilidad.
            Contamos con convenios con mas de 10 reconocidas funerarias con mas de 40 años de presencia líder en el mercado.

            </p>
           
      </div>
      <Mision />
      <div className={s.callToAction}>
        <h3>Anticipate al futuro, es momento de prevenir. Contactanos para mas información.</h3>
        <button onClick={handleContactClick}>Contacta</button>
      </div>
    </div>
  )
};


export default About;