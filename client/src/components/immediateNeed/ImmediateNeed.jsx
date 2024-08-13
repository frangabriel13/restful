import React from "react";
import s from "./ImmediateNeed.module.css";

const ImmediateNeed = () => {
  return (
    <div className={s.container}>
      <div className={s.divTitle}>
        <h2>Necesidad inmediata</h2>
      </div>
      <div className={s.description}>
        <h3>Qué hacer en caso de fallecimiento?</h3>
        <p>
          En momentos difíciles, es importante saber qué pasos tomar. A continuación, te guiamos a través de las acciones inmediatas 
          que debes realizar tras el fallecimiento de un ser querido.
        </p>
      </div>
      <div className={s.divSteps}>
        <h4>Pasos a seguir</h4>
        <div className={s.step}>
          <h5>1. Confirmar el fallecimiento</h5>
          <p>
            Si la persona fallece en su hogar, contacta a un médico para que pueda certificar la defunción. Si la persona fallece en un hospital, 
            el personal médico se encargará de este trámite.
          </p>
        </div>
        <div className={s.step}>
          <h5>2. Contacta a la funeraria</h5>
          <p>
            Una vez que el médico haya certificado la defunción, llama a nuestra funeraria para que podamos asistir en la recogida y cuidado del cuerpo, así como en la organización de los servicios funerarios.
          </p>
        </div>
        <div className={s.step}>
          <h5>3. Notifica a familiares y amigos</h5>
          <p>
            Notifica a familiares y amigos cercanos sobre el fallecimiento de tu ser querido. Es importante que las personas cercanas estén al tanto de la situación.
          </p>
        </div>
        <div className={s.step}>
          <h5>4. Prepara el funeral</h5>
          <p>
            Una vez que el cuerpo haya sido llevado a la funeraria, podrás comenzar a preparar el funeral. La funeraria te guiará a través de los pasos a seguir.
          </p>
        </div>
        <div className={s.step}>
          <h5>5. Trámites legales</h5>
          <p>
            Una vez que hayas realizado los pasos anteriores, deberás ocuparte de los trámites legales correspondientes. Esto incluye la obtención del certificado de defunción y la realización de los trámites de entierro o cremación.
          </p>
        </div>
        <div className={s.step}>
          <h5>6. Apoyo emocional</h5>
          <p>
            En momentos difíciles, es importante contar con el apoyo emocional de familiares y amigos. No dudes en pedir ayuda si la necesitas.
          </p>
        </div>
      </div>
    </div>
  )
};


export default ImmediateNeed;