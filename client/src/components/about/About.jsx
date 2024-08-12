import React from "react";
import s from "./About.module.css";
import about from "../../assets/about.jpg";

const About = () => {
  return (
    <div className={s.container}>
      <div className={s.about}>
        <div className={s.divTitle}>
          <h2>Quiénes somos?</h2>
        </div>
        <div className={s.divData}>
          <div className={s.description}>
            <h3>La empresa</h3>
            <p>
              Eternal Restful es una empresa comprometida a brindar servicios funerarios de alta calidad, enfocada en ofrecer un apoyo integral y respetuoso 
              en los momentos más difíciles. Con una trayectoria que refleja profesionalismo y sensibilidad, nos dedicamos a acompañar a las familias 
              en cada paso del proceso, desde la planificación hasta la ceremonia final, asegurando que cada detalle se maneje con la mayor delicadeza 
              y consideración. Nuestro objetivo es aliviar la carga emocional durante este tiempo, proporcionando un ambiente de paz y confort, 
              donde los seres queridos puedan despedirse de manera digna y serena. Con un equipo experimentado y compasivo, en Eternal Restful nos enorgullece 
              ofrecer un servicio personalizado, adaptado a las necesidades y deseos de cada familia, garantizando que el homenaje a la vida de su ser querido 
              sea un reflejo auténtico de su legado.
            </p>
          </div>
          <div>
            <img src={about} alt="About" />
          </div>
        </div>
      </div>
    </div>
  )
};


export default About;