import React, { useState } from "react";
import { useDispatch } from "react-redux";
import s from "./Contact.module.css";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { sendEmail } from "../../redux/actions/emailActions";
import { validateForm } from "../../utils/validations";

const Contact = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    age: "",
    type: "",
    phone: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  console.log(formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phone: value });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const { email, name, lastName, type, phone, age } = formData;
  //   const subject = `Consulta de ${name} ${lastName}`;
  //   const text = `
  //     Nombre: ${name} ${lastName}
  //     Email: ${email}
  //     Teléfono: ${phone}
  //     Tipo de consulta: ${type}
  //     Edad: ${age}
  //   `;
  //   dispatch(sendEmail(email, subject, text));
  //   setFormData({
  //     name: "",
  //     lastName: "",
  //     age: "",
  //     type: "",
  //     phone: "",
  //     email: "",
  //   });
  // };
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if(Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const { email, name, lastName, type, phone, age } = formData;
    const subject = `Consulta de ${name} ${lastName}`;
    const text = `
      Nombre: ${name} ${lastName}
      Email: ${email}
      Teléfono: ${phone}
      Tipo de consulta: ${type}
      Edad: ${age}
    `;
    // dispatch(sendEmail(email, subject, text));
    setFormData({
      name: "",
      lastName: "",
      age: "",
      type: "",
      phone: "",
      email: "",
    });
    setErrors({});
  };

  return (
    <div className={s.container}>
      <div className={s.divForm}>
        <h2>Necesitas asesoría inmediata?</h2>
        <form onSubmit={handleSubmit}>
          <div className={s.divInput}>
            <input type="text" name="name" placeholder="Nombre" className={s.input} value={formData.name} onChange={handleChange} />
            {errors.name && <p className={s.error}>{errors.name}</p>}
            <input type="text" name="lastName" placeholder="Apellido" className={s.input} value={formData.lastName} onChange={handleChange} />
          </div>
          <div className={s.divInput}>
            <input type="number" name="age" placeholder="Edad" className={s.input} value={formData.age} onChange={handleChange} />
            <select name="type" className={s.select} value={formData.type} onChange={handleChange} >
              <option value="value1">Consulta</option>
              <option value="value2">Asesoría</option>
              <option value="value3">Otro</option>
            </select>
          </div>
          <div className={s.divPhone}>
            <PhoneInput
              country={'us'}
              value={formData.phone}
              placeholder="Teléfono"
              containerClass={s.phoneInputContainer}
              inputClass={s.phoneInput}
              buttonClass={s.phoneInputButton}
              dropdownClass={s.phoneInputDropdown}
              searchClass={s.phoneInputSearch}
              onChange={handlePhoneChange}
            />
            <input type="email" name="email" placeholder="Email" className={s.input} value={formData.email} onChange={handleChange} />
          </div>
          <div className={s.divSend}>
            <button type="submit" className={s.btnSend}>Enviar</button>
          </div>
        </form>
      </div>
    </div>
  );
}


export default Contact;