import React from "react";
import s from "./ServiceType.module.css";
import { Link } from "react-router-dom";

const ServiceType = () => {
  return (
    <div className={s.container}>
      <h3>Conoce todos nuestros servicios</h3>
      <p>
        Da click en el siguiente botón para conocer todos los servicios que ofrecemos
      </p>
      <Link to="/services">
        <button>Ver servicios</button>
      </Link>
    </div>
  )
};


export default ServiceType;