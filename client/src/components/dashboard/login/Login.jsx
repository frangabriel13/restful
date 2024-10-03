import React, { useState } from "react";
import { useDispatch } from "react-redux";
import s from "./Login.module.css";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../../redux/actions/authActions";
import { validateLogin } from "../../../utils/validations";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };

    const validationErrors = validateLogin(data);
    if(Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const result = await dispatch(login(data));
    if(result.success) {
      navigate("/dashboard");
    } else {
      setErrors({ message: result.message, ...result.info });
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  return (
    <div className={s.container}>
      <h2>Login</h2>
      <form className={s.form} onSubmit={handleSubmit}>
        {errors.message && <p className={s.error}>{errors.message}</p>}
        <div className={s.divInput}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className={s.error}>{errors.email}</p>}
        </div>
        <div className={s.divInput}>
          <label>Password</label>
          <div className={s.divPass}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className={s.eye} onClick={handleShowPassword}>
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </span>
          </div>
          {errors.password && <p className={s.error}>{errors.password}</p>}
        </div>
        <button className={s.btn} type="submit">Login</button>
      </form>
      <div className={s.forgotPassword}>
        <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
      </div>
    </div>
  );
};


export default Login;