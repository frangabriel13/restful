import React, { useState } from "react";
import { useDispatch } from "react-redux";
import s from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { login } from "../../../redux/actions/authActions";
import { validateLogin } from "../../../utils/validations";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className={s.error}>{errors.password}</p>}
        </div>
        <button className={s.btn} type="submit">Login</button>
      </form>
    </div>
  );
};


export default Login;