import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./Services.module.css";
import { getServices } from "../../redux/actions/serviceActions";
import ServiceCard from "./serviceCard/ServiceCard";
import { translations } from "../../components/translations"; // Importa las traducciones

const Services = ({ language }) => {
  const dispatch = useDispatch();
  const services = useSelector((state) => state.service.services);

  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);

  const t = translations[language]; // Selecciona el idioma adecuado

  return (
    <div id="services" className={s.container}>
      <div className={s.divTitle}>
        <h2>{t.servicesTitle}</h2>
      </div>
      <div className={s.description}>
        <h3>{t.servicesSubtitle}</h3>
        <p>{t.servicesDescription}</p>
      </div>
      <div className={s.cardsContainer}>
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} language={language}/>
        ))}
      </div>
    </div>
  );
};

export default Services;
