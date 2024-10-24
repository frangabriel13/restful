import React from "react";
import s from "./Footer.module.css";
import logo from "../../assets/principal.png";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { translations } from "../translations";

const Footer = ({ language }) => {
  const t = translations[language].footer;

  return (
    <div className={s.container}>
      <div className={s.divContent}>
        <div className={s.divData}>
          <img className={s.img} src={logo} alt="logo" title="Logo de Restful" />
          <div className={s.divSocial}>
            <h5>{t.ourNetworks}</h5>
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
            <p>{t.homeAppointments}</p>
          </div>
          <div className={s.divInfo}>
            <FaWhatsapp className={s.icon} /> 
            <p>+1 323 551 7579</p>
          </div>
          <div className={s.divInfo}>
            <MdOutlineEmail className={s.icon} />
            <p>eternalresfulfuneralservices@gmail.com</p>
          </div>
        </div>
        <div className={s.divFaq}>
          <p>{t.termsAndConditions}</p>
          <p>{t.privacyPolicy}</p>
          <p>{t.faq}</p>
        </div>
      </div>
      <div className={s.divCopy}>
        <p>
          {t.copyright}
        </p>
      </div>
    </div>
  );
};


export default Footer;