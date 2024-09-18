import React from 'react';
import styles from './Instructions.module.css';

const Instructions = () => {
  return (
    <div className={styles.gridContainer}>
      <div className={styles.step}>
        <h5>1. Comunícate con las autoridades</h5>
        <p>
          Si ha ocurrido un fallecimiento fuera de un hospital u hospicio, comuníquese con las autoridades. Simplemente marque 911 si la policía o los paramédicos no están presentes.
        </p>
      </div>
      <div className={styles.step}>
        <h5>2. Contacta a la funeraria</h5>
        <p>
          Llame a Rose Hills al <span className={styles.phone}>562-699-0921</span> y haremos los arreglos para recoger a su ser querido y guiarle a usted a través del proceso de planificación del funeral.
        </p>
      </div>
      <div className={styles.step}>
        <h5>3. Notifica a familiares y amigos</h5>
        <p>
          Pídale a un amigo o familiar de confianza que le ayude a notificar a otras personas acerca del fallecimiento.
        </p>
      </div>
      <div className={styles.step}>
        <h5>4. Prepara el funeral</h5>
        <p>
          Una vez que el cuerpo haya sido llevado a la funeraria, podrás comenzar a preparar el funeral. La funeraria te guiará a través de los pasos a seguir.
        </p>
      </div>
      <div className={styles.step}>
        <h5>5. Trámites legales</h5>
        <p>
          Deberás ocuparte de los trámites legales correspondientes, como la obtención del certificado de defunción y la realización de los trámites de entierro o cremación.
        </p>
      </div>
      <div className={styles.step}>
        <h5>6. Apoyo emocional</h5>
        <p>
          En momentos difíciles, es importante contar con el apoyo emocional de familiares y amigos. No dudes en pedir ayuda si la necesitas.
        </p>
      </div>
    </div>
  );
}

export default Instructions;

