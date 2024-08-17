import React from "react";
import s from "./Home.module.css";
import fondo from "../../assets/fondoJarron.jpg";
import ToAbout from "./toAbout/ToAbout";

const Home = () => {
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
            <button>Pedir cotización</button>
          </div>
        </div>
      </div>
      <div>
        <ToAbout />
      </div>
    </div>
  );
};


export default Home;