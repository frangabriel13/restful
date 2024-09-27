import React from "react";
import s from "./Contact.module.css";
import ContactForm from "./contactForm/ContactForm";
import { translations } from "../../components/translations"; // Importa las traducciones

const Contact = ({ language }) => {
  const t = translations[language]; // Selecciona el idioma adecuado

  return (
    <div className={s.container}>
      <div className={s.divTitle}>
        <h2>{t.contactTitle}</h2> {/* Título traducido */}
      </div>
      {/* Pasamos la prop language al ContactForm */}
      <ContactForm language={language} />
    </div>
  );
};

export default Contact;
