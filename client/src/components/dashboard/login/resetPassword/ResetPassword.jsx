import React, { useState } from "react";
import { useDispatch } from "react-redux";
import s from "./ResetPassword.module.css";
import { resetPassword } from "../../../../redux/actions/authActions";
import { useParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(resetPassword(token, password));
    if (result.success) {
      setMessage("Contraseña restablecida con éxito. Redirigiendo a la página de inicio de sesión...");
      setError("");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } else {
      setError(result.message);
      setMessage("");
    }
  };

  return (
    <div className={s.container}>
      <h2>Restablecer Contraseña</h2>
      <form className={s.form} onSubmit={handleSubmit}>
        {message && <p className={s.success}>{message}</p>}
        {error && <p className={s.error}>{error}</p>}
        <div className={s.divInput}>
          <label>Nueva Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className={s.btn} type="submit">Restablecer</button>
      </form>
    </div>
  );
};

export default ResetPassword;