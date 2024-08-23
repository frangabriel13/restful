import React, { useState } from "react";
import { useDispatch } from "react-redux";
import s from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { login } from "../../../redux/actions/authActions";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };
    await dispatch(login(data));
    navigate("/dashboard");
  };

  return (
    <div className={s.container}>
      <h2>Login</h2>
      <form className={s.form} onSubmit={handleSubmit}>
        <div className={s.divInput}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={s.divInput}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className={s.btn} type="submit">Login</button>
      </form>
    </div>
  );
};


export default Login;