import React from "react";
import s from "./Benefits.module.css";
import { TiTickOutline } from "react-icons/ti";

const Benefits = () => {
  return (
    <div className={s.container}>
      <h3>Beneficios</h3>
      <div className={s.divBenefits}>
        <div className={s.benefit}>
          <TiTickOutline className={s.icon} />
          <p>Planes funerales con precios accesibles.</p>
        </div>
        <div className={s.benefit}>
          <TiTickOutline className={s.icon} />
          <p>Plan funeral no cuenta con vigencia.
          </p>
        </div>
        <div className={s.benefit}>
          <TiTickOutline className={s.icon} />
          <p>El Precio se congela al firmar contrato y se le respeta su servicio integro.</p>
        </div>
        <div className={s.benefit}>
          <TiTickOutline className={s.icon} />
          <p>No hay pago inicial (aplican restricciones)</p>
        </div>
        <div className={s.benefit}>
          <TiTickOutline className={s.icon} />
          <p>Comodos pagos mensuales</p>
        </div>
        <div className={s.benefit}>
          <TiTickOutline className={s.icon} />
          <p>Contamos con diferentes opciones de pago.
          </p>
        </div>
        <div className={s.benefit}>
          <TiTickOutline className={s.icon} />
          <p>Plan funeral personalizado a tus necesidades

          </p>
        </div>
      </div>
    </div>
  )
};


export default Benefits;