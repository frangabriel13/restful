import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import s from "./RegisterUser.module.css";
import { registerAdminWithToken } from "../../../redux/actions/authActions";
import { validateRegisterAdmin } from "../../../utils/validations";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const RegisterUser = ({ registrationLink }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();
  const location = useLocation();
  const name = new URLSearchParams(location.search).get("name");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateRegisterAdmin(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const result = await dispatch(registerAdminWithToken({ ...formData, name }, token));
    if (result.success) {
      setSuccessMessage("Registration successful!");
      setTimeout(() => {
        navigate("/dashboard/login");
      }, 2000);
    } else {
      setErrors(result.errors);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className={s.container}>
      <h3>Register User</h3>
      <form className={s.form} onSubmit={handleSubmit}>
        <div className={s.divForm}>
          <div className={s.divInput}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
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
                value={formData.password}
                onChange={handleChange}
              />
              <span className={s.eye} onClick={handleShowPassword}>
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </span>
            </div>
            {errors.password && <p className={s.error}>{errors.password}</p>}
          </div>
          <div className={s.divInput}>
            <label>Confirm Password</label>
            <div className={s.divPass}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <span className={s.eye} onClick={handleShowConfirmPassword}>
                {showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </span>
            </div>
            {errors.confirmPassword && <p className={s.error}>{errors.confirmPassword}</p>}
          </div>
        </div>
        <div className={s.divBtn}>
          <button className={s.btnRegister} type="submit">Register</button>
        </div>
      </form>
      {successMessage && <p className={s.success}>{successMessage}</p>}
    </div>
  );
};


export default RegisterUser;