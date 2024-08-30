import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerSuperAdmin } from "../../../redux/actions/authActions";

const Register = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerSuperAdmin(data));
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={data.password}
          onChange={handleChange}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  )
};


export default Register;