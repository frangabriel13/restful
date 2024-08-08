import React from "react";
import s from "./Contact.module.css";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const Contact = () => {
  return (
    <div className={s.container}>
      <div className={s.divForm}>
        <h2>Necesitas asesoría inmediata?</h2>
        <form>
          <div className={s.divInput}>
            <input type="text" placeholder="Nombre" className={s.input} />
            <input type="text" placeholder="Apellido" className={s.input} />
          </div>
          <div className={s.divInput}>
            <input type="number" placeholder="Edad" className={s.input} />
            <select className={s.select}>
              <option value="value1">Consulta</option>
              <option value="value2" selected>Asesoría</option>
              <option value="value3">Otro</option>
            </select>
          </div>
          <div className={s.divPhone}>
            <PhoneInput
              country={'us'}
              value={''}
              // value={this.state.phone}
              placeholder="Teléfono"
              containerClass={s.phoneInputContainer}
              inputClass={s.phoneInput}
              buttonClass={s.phoneInputButton}
              dropdownClass={s.phoneInputDropdown}
              searchClass={s.phoneInputSearch}
            />
            <input type="email" placeholder="Email" className={s.input} />
          </div>
        </form>
        <div className={s.divSend}>
          <button className={s.btnSend}>Enviar</button>
        </div>
      </div>
    </div>
  );
}


export default Contact;