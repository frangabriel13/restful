import React, { useEffect, useState } from "react";
import s from "./ContactForm.module.css";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { sendEmail } from "../../../redux/actions/emailActions";
import { validateForm } from "../../../utils/validations";
import { getServices } from "../../../redux/actions/serviceActions";
import { createOrder } from "../../../redux/actions/orderActions";
import { useDispatch, useSelector } from "react-redux";
import { translations } from "../../translations";
import ConfirmationMessage from "./ConfirmationMessage"; // Asegúrate de importar el nuevo componente

const ContactForm = ({ language }) => {
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
  const [selectedServiceName, setSelectedServiceName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false); // Nuevo estado para manejar el envío del formulario
  const t = translations[language];

  useEffect(() => {

    dispatch(getServices());
  }, [dispatch, services]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submit triggered"); // Para ver si el formulario llega aquí

    const errors = validateForm(form);
    if (Object.keys(errors).length) {
      console.log("Validation errors:", errors); // Para ver los errores de validación
      setErrors(errors);
      return;
    }

    const { email, service, name, lastname, age, phone } = form;
    const subject = `${t.emailSubject} ${selectedServiceName}`;
    const text = `${t.name}: ${name} ${lastname}\n${t.age}: ${age}\n${t.phone}: ${phone}\n${t.email}: ${email}\n${t.service}: ${selectedServiceName}`;

    const orderData = {
      contactName: `${name} ${lastname}`,
      phoneNumber: phone,
      email,
      serviceId: service !== 'not_sure' ? service : null,
      age,
    };

    console.log("Order data to be sent:", orderData); // Verifica qué datos se están enviando

    try {
      await dispatch(createOrder(orderData));
      console.log("Order created"); // Verifica si la orden fue creada
      await dispatch(sendEmail(email, subject, text));
      console.log("Email sent"); // Verifica si el correo fue enviado
      clearForm();
      setIsSubmitted(true);  // Establece que el formulario ha sido enviado correctamente
      console.log("isSubmitted set to true"); // Para verificar que `isSubmitted` cambia a `true`
    } catch (error) {
      console.error("Error during form submission:", error); // Captura cualquier error que ocurra
    }
  };

  const clearForm = () => {
    console.log("Clearing form"); // Depuración para ver si la función clearForm se ejecuta
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

  const handleServiceChange = (e) => {
    const selectedService = services.find(service => service.id === parseInt(e.target.value));
    setForm({ ...form, service: e.target.value });
    setSelectedServiceName(selectedService ? selectedService.name[language] : t.notSure);
    console.log("Service selected:", selectedServiceName); // Depuración para ver qué servicio ha sido seleccionado
  };

  return (
    <div className={s.container}>
      <div className={s.divTitle}>
        <h3>{t.formTitle}</h3>
        <p>{t.formSubtitle}</p>
      </div>
      <div className={s.divForm}>
        {isSubmitted ? (
          <ConfirmationMessage language={language} /> // Muestra el mensaje de confirmación si se ha enviado el formulario
        ) : (
          <form className={s.form} onSubmit={handleSubmit}>
            <div className={s.divName}>
              <div className={s.divNombre}>
                <input type="text" name="name" placeholder={t.namePlaceholder} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                {errors.name && <p className={s.error}>{errors.name}</p>}
              </div>
              <div className={s.divNombre}>
                <input type="text" name="lastname" placeholder={t.lastnamePlaceholder} value={form.lastname} onChange={(e) => setForm({ ...form, lastname: e.target.value })} />
                {errors.lastName && <p className={s.error}>{errors.lastName}</p>}
              </div>
            </div>
            <div className={s.services}>
              <div className={s.divAge}>
                <input type="number" name="age" placeholder={t.agePlaceholder} value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} />
                {errors.age && <p className={s.error}>{errors.age}</p>}
              </div>
              <div className={s.divService}>
                <select name="service" value={form.service} onChange={handleServiceChange}>
                  <option value="">{t.selectService}</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name[language]}
                    </option>
                  ))}
                  <option value="not_sure">{t.notSure}</option>
                </select>
                {errors.type && <p className={s.error}>{errors.type}</p>}
              </div>
            </div>
            <div className={s.mail}>
              <div className={s.divEmail}>
                <input type="email" name="email" placeholder={t.emailPlaceholder} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                {errors.email && <p className={s.error}>{errors.email}</p>}
              </div>
              <div className={s.phoneInputContainer}>
                <PhoneInput
                  country={'us'}
                  value={form.phone}
                  onChange={(phone, country, e, formattedValue) => setForm({ ...form, phone: formattedValue })}
                  inputClass={s.phoneInput}
                />
                {errors.phone && <p className={s.error}>{errors.phone}</p>}
              </div>
            </div>
            <div className={s.divBtn}>
              <button className={s.button} type="submit">{t.submit}</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactForm;



