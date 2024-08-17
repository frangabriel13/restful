import React from "react";
import s from "./Home.module.css";
import fondo from "../../assets/fondoJarron.jpg";
import ToAbout from "./toAbout/ToAbout";
import Redirect from "./redirect/Redirect";
import ServiceType from "./serviceType/ServiceType";
import { Link } from "react-router-dom";
import ToContact from "./toContact/ToContact";
import { scrollToSection } from "../../utils/utilities";

const Home = () => {
  const handleScroll = () => {
    scrollToSection("contact");
  };

  return (
    <div>
      <div className={s.container}>
        <div className={s.divContainer}>
          <div className={s.divData}>
            <h1>Eternal Restful</h1>
            <p>En Eternal Restful nos dedicamos a la creación de jarrones funerarios</p>
          </div>
          <div className={s.divContact}>
            <h2>Pide tu cotización</h2>
            <p>
              Contáctanos para obtener tu cotización de jarrones funerarios
            </p>
            {/* <button>Pedir cotización</button> */}
            <Link to="/contact" className={s.link} onClick={handleScroll} > 
              <button className={s.button}>Pedir cotización</button>
            </Link>
          </div>
        </div>
      </div>
      <div>
        <ToAbout />
        <Redirect />
        <ServiceType />
        <ToContact />
      </div>
    </div>
  );
};


export default Home;