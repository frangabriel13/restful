import React from "react";
import s from "./Redirect.module.css";
import img1 from "../../../assets/services/service1.jpg";
import { Link } from "react-router-dom";

const Redirect = () => {
  return (
    <div className={s.redirect}>
      <Link to="/future-planning" className={s.link}>
        <div className={s.target} style={{ backgroundImage: `url(${img1})` }}>
          <h4>Planes Futuros</h4>
        </div>
      </Link>
      <Link to="/immediate-need" className={s.link}>
        <div className={s.target} style={{ backgroundImage: `url(${img1})` }}>
          <h4>Necesidad Inmediata</h4>
        </div>
      </Link>
      <Link to="/mourning" className={s.link}>
        <div className={s.target} style={{ backgroundImage: `url(${img1})` }}>
          <h4>Duelo</h4>
        </div>
      </Link>
    </div>
  );
};


export default Redirect;