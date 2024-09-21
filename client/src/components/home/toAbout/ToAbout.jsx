import React from "react";
import s from "./ToAbout.module.css";
import { Link } from "react-router-dom";
import { scrollToSection } from "../../../utils/utilities";

const ToAbout = () => {
  const handleScroll = () => {
    scrollToSection("about");
  };

  return (
    <div className={s.container}>
      <h3>Conoce más sobre Eternal Restful</h3>
      <Link to="/about" onClick={handleScroll}>
        <button>Ir</button>
      </Link>
    </div>
  )
}


export default ToAbout;