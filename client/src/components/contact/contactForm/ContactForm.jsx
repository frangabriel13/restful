import React from "react";
import s from "./ContactForm.module.css";

const ContactForm = () => {
  return (
    <div>
      <div>
        <h4>Completa el formulario para recibir asesoramiento</h4>
        <p>Te responderemos a la brevedad</p>
      </div>
      <div>
        <form>
          <div>
            <label>Nombre</label>
            <input type="text" />
          </div>
          <div>
            <label>Correo electrónico</label>
            <input type="email" />
          </div>
          <div>
            <label>Teléfono</label>
            <input type="tel" />
          </div>
          <div>
            <label>Mensaje</label>
            <textarea></textarea>
          </div>
          <button>Enviar</button>
        </form>
      </div>
    </div>
  )
};


export default ContactForm;