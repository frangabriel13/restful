import React, { useState } from "react";
import { useDispatch } from "react-redux";
import s from "./Contact.module.css";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { sendEmail } from "../../redux/actions/emailActions";
import { validateForm } from "../../utils/validations";
import ContactForm from "./contactForm/ContactForm";

const Contact = () => {
  return (
    <div className={s.container}>
      <div className={s.divTitle}>
        <h2>Iniciar arreglos</h2>
      </div>
      <ContactForm />
    </div>
  );
}


export default Contact;