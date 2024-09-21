import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerSuperAdmin } from "../../../redux/actions/authActions";
import s from "./Register.module.css";
import { useNavigate } from "react-router-dom";
import { validateLogin } from "../../../utils/validations";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateLogin(data);
    if(Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const result = await dispatch(registerSuperAdmin(data));
    if(result.success) {
      navigate("/dashboard/login");
    } else {
      setErrors({ message: result.message, ...result.info });
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  return (
    <div className={s.container}>
      <h2>Register</h2>
      <form className={s.form} onSubmit={handleSubmit}>
        {errors.message && <p className={s.error}>{errors.message}</p>}
        <div className={s.divInput}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
          />
          {errors.email && <p className={s.error}>{errors.email}</p>}
        </div>
        <div className={s.divInput}>
          <label>Password</label>
          <div className={s.divPass}>
            <input
              // type="password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={data.password}
              onChange={handleChange}
            />
            <span className={s.eye} onClick={handleShowPassword}>
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </span>
          </div>
          {errors.password && <p className={s.error}>{errors.password}</p>}
        </div>
        <button className={s.btn} type="submit">Register</button>
      </form>
    </div>
  )
};


export default Register;