import React from "react";
import s from "./ToContact.module.css";
import { Link } from "react-router-dom";

const ToContact = () => {
  return (
    <div className={s.container}>
      <h3>O contáctanos directamente</h3>
      <Link to="/contact">
        <button>Contactar</button>
      </Link>
    </div>
  )
}


export default ToContact;