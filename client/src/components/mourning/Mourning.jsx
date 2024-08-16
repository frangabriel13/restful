import React from "react";
import s from "./Mourning.module.css";

const Mourning = () => {
  return (
    <div className={s.container}>
      <div className={s.divTitle}>
        <h2>Duelo</h2>
      </div>
      <div className={s.description}>
        {/* <h3>Qué hacer en caso de fallecimiento?</h3> */}
        <p>
          El duelo es una respuesta emocional natural ante la pérdida de un ser querido. 
          Es un proceso único para cada persona, que puede manifestarse de diferentes maneras y durar distintos periodos de tiempo. 
          Comprender las etapas del duelo puede ayudar a sobrellevar esta difícil experiencia, 
          proporcionando un marco que facilita la comprensión de nuestras emociones durante el proceso de sanar.
        </p>
      </div>
      <div className={s.divMourning}>
        <h3>Las 5 etapas del duelo</h3>
        <div className={s.divStages}>
          <div className={s.stage}>
            <h4>1. Negación</h4>
            <p>
              La negación es una reacción que se produce de forma muy habitual inmediatamente después de una pérdida. 
              No es infrecuente que, cuando experimentamos una pérdida súbita, tengamos una sensación de irrealidad o de incredulidad 
              que puede verse acompañada de una congelación de las emociones. Se puede manifestar con expresiones tales como: “aún no me creo que sea verdad”, 
              “es como si estuviera viviendo una pesadilla” e incluso con actitudes de aparente “entereza emocional” o de actuar “como si no hubiera pasado nada”.
            </p>
          </div>
          <div className={s.stage}>
            <h4>2. Ira</h4>
            <p>
              A medida que la negación comienza a disiparse, emerge la ira. Puede estar dirigida hacia uno mismo, 
              hacia otras personas, o incluso hacia la persona que ha fallecido. Esta etapa es una forma de canalizar el dolor y 
              la frustración.
            </p>
          </div>
          <div className={s.stage}>
            <h4>3. Negociación</h4>
            <p>
              En esta etapa, las personas pueden intentar negociar o hacer tratos, a menudo con una fuerza mayor 
              o con su propia mente, en un intento de revertir o mitigar la realidad de la pérdida. 
              Es una forma de buscar algún sentido o control en medio de la incertidumbre.
            </p>
          </div>
          <div className={s.stage}>
            <h4>4. Depresión</h4>
            <p>
              Esta es una de las etapas más difíciles del duelo, caracterizada por una profunda tristeza y 
              la sensación de vacío. Durante esta fase, es normal sentir una pérdida de interés en actividades cotidianas y 
              un deseo de aislarse.
            </p>
          </div>
          <div className={`${s.stage} ${s.stage5}`}>
            <h4>5. Aceptación</h4>
            <p>
              La aceptación no significa que el dolor haya desaparecido, sino que se ha encontrado una manera de seguir adelante. 
              Es el reconocimiento de la realidad de la pérdida y la adaptación a una nueva vida sin la persona amada.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Mourning;