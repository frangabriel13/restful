import React, { useEffect, useState } from "react";
import s from "./ContactForm.module.css";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { sendEmail } from "../../../redux/actions/emailActions";
import { validateForm } from "../../../utils/validations";
import { getServices } from "../../../redux/actions/serviceActions";
import { useDispatch, useSelector } from "react-redux";

const ContactForm = () => {
  const dispatch = useDispatch();
  const services = useSelector((state) => state.service.services);
  const [form, setForm] = useState({
    name: "",
    lastname: "",
    age: "",
    phone: "",
    service: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getServices());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(form);
    if (Object.keys(errors).length) {
      setErrors(errors);
      return;
    }
    dispatch(sendEmail(form));
  };

  return (
    <div className={s.container}>
      <div className={s.divTitle}>
        <h3>Completa el formulario para recibir asesoramiento</h3>
        <p>Te responderemos a la brevedad</p>
      </div>
      <div className={s.divForm}>
        <form className={s.form}>
          <div className={s.divName}>
            <input type="text" name="name" placeholder="Nombre" onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input type="text" name="lastname" placeholder="Apellido" onChange={(e) => setForm({ ...form, lastname: e.target.value })} />
          </div>
          <div className={s.services}>
            <input type="number" name="age" placeholder="Edad" onChange={(e) => setForm({ ...form, age: e.target.value })} />
            <select name="service">
              <option value="">Selecciona un servicio</option>
              {services.map((service) => (
                <option key={service.id} value={service.id} onClick={(e) => setForm({ ...form, service: e.target.value })}>
                  {service.name}
                </option>
              ))}
              <option value="not_sure" onClick={(e) => setForm({ ...form, service: e.target.value })}>No estoy seguro (a)</option>
            </select>
          </div>
          <div className={s.mail}>
            <input type="email" name="email" placeholder="Correo electrónico" onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <PhoneInput
              country={'us'}
              value={form.phone}
              onChange={(phone) => setForm({ ...form, phone })}
            />
          </div>
          <button className={s.button} type="submit" onClick={handleSubmit}>Enviar</button>
        </form>
      </div>
    </div>
  )
};


export default ContactForm;