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

  useEffect(() => {
    dispatch(getServices());
  }, []);

  console.log(services);

  return (
    <div className={s.container}>
      <div className={s.divTitle}>
        <h3>Completa el formulario para recibir asesoramiento</h3>
        <p>Te responderemos a la brevedad</p>
      </div>
      <div className={s.divForm}>
        <form>
          <div className={s.divName}>
            <div>
              <input type="text" name="name" placeholder="Nombre" />
            </div>
            <div>
              <input type="text" name="lastname" placeholder="Apellido" />
            </div>
          </div>
          <div className={s.services}>
            <div>
              <input type="number" name="age" placeholder="Edad" />
            </div>
            <div className={s.service}>
              <select name="service">
                <option value="">Selecciona un servicio</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
                <option value="not_sure">No estoy seguro (a)</option>
              </select>
            </div>
          </div>
          <button>Enviar</button>
        </form>
      </div>
    </div>
  )
};


export default ContactForm;