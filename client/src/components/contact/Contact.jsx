import React, { useState } from "react";
import { useDispatch } from "react-redux";
import s from "./Contact.module.css";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { sendEmail } from "../../redux/actions/emailActions";

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
  console.log(formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phone: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, name, lastName, type } = formData;
    const subject = `Consulta de ${name} ${lastName}`;
    const text = `Tipo de consulta: ${type}`;
    dispatch(sendEmail(email, subject, text));
  };

  return (
    <div className={s.container}>
      <div className={s.divForm}>
        <h2>Necesitas asesoría inmediata?</h2>
        <form onSubmit={handleSubmit}>
          <div className={s.divInput}>
            <input type="text" name="name" placeholder="Nombre" className={s.input} value={formData.name} onChange={handleChange} />
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