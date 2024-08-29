import React from "react";
import s from "./Footer.module.css";
import logo from "../../assets/logo.png";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

const Footer = () => {
  return (
    <div className={s.container}>
      <div className={s.divContent}>
        <div className={s.divData}>
          <img className={s.img} src={logo} alt="logo" title="Logo de Restful" />
          <div className={s.divSocial}>
            <h5>Nuestras redes:</h5>
            <div className={s.divIcons}>
              <FaFacebook className={s.icon} />
              <FaInstagram className={s.icon} />
              <FaTiktok className={s.icon} />
            </div>
          </div>
        </div>
        <div className={s.divContact}>
          <div className={s.divInfo}>
            <IoLocationOutline className={s.icon} />
            <p>Calle falsa 123, California, EEUU</p>
          </div>
          <div className={s.divInfo}>
            <FaWhatsapp className={s.icon} /> 
            <p>+1 234 567 890</p>
          </div>
          <div className={s.divInfo}>
            <MdOutlineEmail className={s.icon} />
            <p>eternalrestful@gmail.com</p>
          </div>
        </div>
        <div className={s.divFaq}>
          <p>Términos y condiciones</p>
          <p>Política de privacidad</p>
          <p>Preguntas frecuentes</p>
        </div>
      </div>
      <div className={s.divCopy}>
        <p>
          Copyright © 2024 Eternal Restful. Todos los derechos reservados. Diseñado por mandeveloper
        </p>
      </div>
    </div>
  );
};


export default Footer;