import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./CreateOrder.module.css";
import { createOrder } from "../../../redux/actions/orderActions";
import { getFuneralHomes } from "../../../redux/actions/funeralHomeActions";
import { getServices } from "../../../redux/actions/serviceActions";
import { getUsers } from "../../../redux/actions/userActions";

const CreateOrder = () => {
  const dispatch = useDispatch();
  const funeralHomes = useSelector((state) => state.funeralHome.funeralHomes);
  const services = useSelector((state) => state.service.services);
  const users = useSelector((state) => state.user.users);
  const [form, setForm] = useState({
    status: "new",
    insurance: "pending",
    funeralHomeId: "",
    tracking: [],
    price: "",
    contactName: "",
    phoneNumber: "",
    email: "",
    comission: [],
    relationship: "",
    deceasedName: "",
    age: "",
    serviceId: "",
    userId: "",
    source: "",
  });
  const [comment, setComment] = useState("");
  const [selectedComission, setSelectedComission] = useState("");

  useEffect(() => {
    dispatch(getFuneralHomes());
    dispatch(getServices());
    dispatch(getUsers());
  }, [dispatch]);

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

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const addComment = () => {
    if (comment.trim()) {
      setForm({
        ...form,
        tracking: [...form.tracking, comment.trim()],
      });
      setComment("");
    }
  };

  const handleComissionChange = (e) => {
    setSelectedComission(e.target.value);
  };

  const addComission = () => {
    if (selectedComission && !form.comission.includes(selectedComission)) {
      setForm({
        ...form,
        comission: [...form.comission, selectedComission],
      });
      setSelectedComission("");
    }
  };

  return (
    <div className={s.container}>
      <h3>Create Order</h3>
      <form onSubmit={handleSubmit}>
        <select name="status" value={form.status} onChange={handleChange} required>
          <option value="new">New</option>
          <option value="inProgress">In Progress</option>
          <option value="pending">Pending</option>
          <option value="sold">Sold</option>
          <option value="notSold">Not Sold</option>
        </select>
        <select name="insurance" value={form.insurance} onChange={handleChange} required>
          <option value="pending">Pending</option>
          <option value="GWIC">GWIC</option>
          <option value="CMT">CMT</option>
        </select>
        <select name="funeralHomeId" value={form.funeralHomeId} onChange={handleChange} required>
          <option value="">Select Funeral Home</option>
          {funeralHomes.map((home) => (
            <option key={home.id} value={home.id}>
              {home.name}
            </option>
          ))}
        </select>
        <div>
          <h4>Tracking Comments</h4>
          {form.tracking.map((track, index) => (
            <div key={index}>
              <p>{track}</p>
            </div>
          ))}
          <input
            type="text"
            value={comment}
            onChange={handleCommentChange}
            placeholder="Add a comment"
          />
          <button type="button" onClick={addComment}>Add Comment</button>
        </div>
        <input type="text" name="price" value={form.price} onChange={handleChange} placeholder="Price or Comment" required />
        <input type="text" name="contactName" value={form.contactName} onChange={handleChange} placeholder="Contact Name" required />
        <input type="text" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} placeholder="Phone Number" required />
        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
        <input type="text" name="relationship" value={form.relationship} onChange={handleChange} placeholder="Relationship" required />
        <select name="serviceId" value={form.serviceId} onChange={handleChange} required>
          <option value="">Select Service</option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name}
            </option>
          ))}
        </select>
        <input type="text" name="deceasedName" value={form.deceasedName} onChange={handleChange} placeholder="Deceased Name" required />
        <input type="number" name="age" value={form.age} onChange={handleChange} placeholder="Age" required />
        <input type="text" name="source" value={form.source} onChange={handleChange} placeholder="Source" required />
        <select name="userId" value={form.userId} onChange={handleChange} required>
          <option value="">Select Admin</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <div>
          <h4>Comission</h4>
          {form.comission.map((com, index) => (
            <div key={index}>
              <p>{com}</p>
            </div>
          ))}
          <select value={selectedComission} onChange={handleComissionChange}>
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user.id} value={user.name}>
                {user.name}
              </option>
            ))}
          </select>
          <button type="button" onClick={addComission}>Add Comission</button>
        </div>
        <button type="submit">Create Order</button>
      </form>
    </div>
  )
};


export default CreateOrder;