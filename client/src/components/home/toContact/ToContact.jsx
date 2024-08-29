import React from "react";
import s from "./ToContact.module.css";
import { Link } from "react-router-dom";
import { scrollToSection } from "../../../utils/utilities";

const ToContact = () => {
  const handleScroll = () => {
    scrollToSection("contact");
  };

  return (
    <div className={s.container}>
      <h3>O contáctanos directamente</h3>
      <Link to="/contact" onClick={handleScroll}>
        <button>Contactar</button>
      </Link>
    </div>
  )
}


export default ToContact;