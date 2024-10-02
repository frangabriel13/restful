import React, { useState } from "react";
import { useDispatch } from "react-redux";
import s from "./ForgotPassword.module.css";
import { forgotPassword } from "../../../../redux/actions/authActions";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(forgotPassword(email));
    if (result.success) {
      setMessage("Correo de recuperación enviado. Por favor, revisa tu bandeja de entrada.");
      setError("");
    } else {
      setError(result.message);
      setMessage("");
    }
  };

  return (
    <div className={s.container}>
      <h2>Recuperar Contraseña</h2>
      <form className={s.form} onSubmit={handleSubmit}>
        {message && <p className={s.success}>{message}</p>}
        {error && <p className={s.error}>{error}</p>}
        <div className={s.divInput}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button className={s.btn} type="submit">Enviar</button>
      </form>
    </div>
  );
};


export default ForgotPassword;