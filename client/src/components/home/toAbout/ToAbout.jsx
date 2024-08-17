import React from "react";
import s from "./ToAbout.module.css";
import { Link } from "react-router-dom";

const ToAbout = () => {
  return (
    <div className={s.container}>
      <h3>Conoce más sobre nosotros</h3>
      <Link to="/about">
        <button>Ir</button>
      </Link>
    </div>
  )
}


export default ToAbout;