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
    email: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(form);
    if (Object.keys(errors).length) {
      setErrors(errors);
      console.log(errors);
      return;
    }
    const { email, service, name, lastname, age, phone } = form;
    const subject = `Solicitud de asesoramiento para el servicio ${service}`;
    const text = `Nombre: ${name} ${lastname}\nEdad: ${age}\nTeléfono: ${phone}\nCorreo electrónico: ${email}\nServicio: ${service}`;
    dispatch(sendEmail(email, subject, text));
    clearForm();
  };

  const clearForm = () => {
    setForm({
      name: "",
      lastname: "",
      age: "",
      phone: "",
      service: "",
      email: "",
    });
    setErrors({});
  };

  console.log(errors);

  return (
    <div className={s.container}>
      <div className={s.divTitle}>
        <h3>Completa el formulario para recibir asesoramiento</h3>
        <p>Te responderemos a la brevedad</p>
      </div>
      <div className={s.divForm}>
        <form className={s.form}>
          <div className={s.divName}>
            <input type="text" name="name" placeholder="Nombre" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input type="text" name="lastname" placeholder="Apellido" value={form.lastname} onChange={(e) => setForm({ ...form, lastname: e.target.value })} />
          </div>
          <div className={s.services}>
            <input type="number" name="age" placeholder="Edad" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} />
            <select name="service" value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}>
              <option value="">Selecciona un servicio</option>
              {services.map((service) => (
                <option key={service.id} value={service.name}>
                  {service.name}
                </option>
              ))}
              <option value="not_sure">No estoy seguro (a)</option>
            </select>
          </div>
          <div className={s.mail}>
            <input type="email" name="email" placeholder="Correo electrónico" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <div className={s.phoneInputContainer}>
              <PhoneInput
                country={'us'}
                value={form.phone}
                onChange={(phone, country, e, formattedValue) => setForm({ ...form, phone: formattedValue })}
                inputClass={s.phoneInput}
              />
            </div>
          </div>
          <div className={s.divBtn}>
            <button className={s.button} type="submit" onClick={handleSubmit}>Enviar</button>
          </div>
        </form>
      </div>
    </div>
  )
};

export default ContactForm;