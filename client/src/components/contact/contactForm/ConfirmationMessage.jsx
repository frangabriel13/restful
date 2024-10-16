import React from "react";
import s from "./ConfirmationMessage.module.css"; // Asegúrate de crear un archivo CSS para los estilos

const ConfirmationMessage = ({ language }) => {
  const message = {
    en: "Form successfully received. A representative will contact you shortly. Thank you for choosing Eternal Restful Funeral Services.",
    es: "Formulario recibido correctamente. Pronto un representante se pondrá en contacto contigo. Desde ya, muchas gracias. Eternal Restful Funeral Services."
  };

  return (
    <div className={s.confirmationContainer}>
      <h1 className={s.message}>{message[language]}</h1>
    </div>
  );
};

export default ConfirmationMessage;
