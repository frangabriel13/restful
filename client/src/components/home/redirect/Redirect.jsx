import React from "react";
import s from "./Redirect.module.css";
import img1 from "../../../assets/futuro.jpg";
import img2 from "../../../assets/inmediato.jpg";
import img3 from "../../../assets/duelo.jpg";
import { Link } from "react-router-dom";
import { scrollToSection } from "../../../utils/utilities";

const Redirect = () => {
  const handleScroll = (sectionId) => {
    scrollToSection(sectionId);
  }

  return (
    <div className={s.redirect}>
      <Link to="/future-planning" className={s.link} onClick={() => handleScroll('future-planning')}>
        <div className={s.target} style={{ backgroundImage: `url(${img1})` }}>
          <h4>Planes Futuros</h4>
        </div>
      </Link>
      <Link to="/immediate-need" className={s.link} onClick={() => handleScroll('immediate-need')}>
        <div className={s.target} style={{ backgroundImage: `url(${img2})` }}>
          <h4>Necesidad Inmediata</h4>
        </div>
      </Link>
      <Link to="/mourning" className={s.link} onClick={() => handleScroll('mourning')}>
        <div className={s.target} style={{ backgroundImage: `url(${img3})` }}>
          <h4>Duelo</h4>
        </div>
      </Link>
    </div>
  );
};


export default Redirect;