import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./Services.module.css";
import { getServices } from "../../redux/actions/serviceActions";
import ServiceCard from "./serviceCard/ServiceCard";

const Services = () => {
  const dispatch = useDispatch();
  const services = useSelector((state) => state.service.services);

  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);

  console.log(services);

  return (
    <div className={s.container}>
      <div className={s.divTitle}>
        <h2>Tipos se servicio</h2>
      </div>
      <div className={s.description}>
        <h3>Nuestros servicios</h3>
        <p>
          En nuestra funeraria, ofrecemos una variedad de tipos de servicio diseñados para satisfacer las necesidades y 
          deseos específicos de cada familia en un momento tan delicado. Entendemos que cada situación es única, 
          por lo que proporcionamos opciones que van desde servicios simples y directos, como la cremación básica, 
          hasta ceremonias más personalizadas que incluyen velaciones y homenajes. 
          Además, también ofrecemos servicios adicionales como el traslado de cenizas y la planificación anticipada, 
          asegurando que cada detalle sea manejado con el máximo respeto y profesionalismo. Nuestro compromiso es brindar apoyo integral, 
          permitiendo a las familias honrar la vida de sus seres queridos de la manera que consideren más adecuada.
        </p>
      </div>
      <div>
        {
          services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))
        }
      </div>
    </div>
  )
};


export default Services;