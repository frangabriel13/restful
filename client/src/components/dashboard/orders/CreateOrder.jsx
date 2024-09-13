import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./CreateOrder.module.css";
import { createOrder } from "../../../redux/actions/orderActions";

const CreateOrder = () => {
  const dispatch = useDispatch();
  const formData = {
    contactDate: "",
    contactName: "",
    phoneNumber: "",
    email: "",
    comission: "",
    relationship: "",
    deceasedName: "",
    status: "",
    statusDate: "",
    price: "",
    insurance: "",
    tracking: "",
    age: "",
    serviceId: "",
    userId: "",
    funeralHomeId: "",
  };
  const [form, setForm] = useState(formData);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createOrder(form));
  };

  return (
    <div className={s.container}>
      <h3>Create Order</h3>
      <form onSubmit={handleSubmit}>
        <input type="date" name="contactDate" value={form.contactDate} onChange={handleChange} placeholder="Contact Date" required />
        <input type="text" name="contactName" value={form.contactName} onChange={handleChange} placeholder="Contact Name" required />
        <input type="text" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} placeholder="Phone Number" required />
        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
        <input type="text" name="comission" value={form.comission} onChange={handleChange} placeholder="Comission" required />
        <input type="text" name="relationship" value={form.relationship} onChange={handleChange} placeholder="Relationship" required />
        <input type="text" name="deceasedName" value={form.deceasedName} onChange={handleChange} placeholder="Deceased Name" required />
        <input type="text" name="status" value={form.status} onChange={handleChange} placeholder="Status" required />
        <input type="date" name="statusDate" value={form.statusDate} onChange={handleChange} placeholder="Status Date" required />
        <input type="text" name="serviceId" value={form.serviceId} onChange={handleChange} placeholder="Service ID" required />
        <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="Price" required />
        <input type="text" name="insurance" value={form.insurance} onChange={handleChange} placeholder="Insurance" required />
        <input type="text" name="tracking" value={form.tracking} onChange={handleChange} placeholder="Tracking" required />
        <input type="number" name="age" value={form.age} onChange={handleChange} placeholder="Age" required />
        <input type="text" name="funeralHomeId" value={form.funeralHomeId} onChange={handleChange} placeholder="Funeral Home ID" required />
        <input type="text" name="userId" value={form.userId} onChange={handleChange} placeholder="User ID" required />
        <button type="submit">Create Order</button>
      </form>
    </div>
  )
};


export default CreateOrder;