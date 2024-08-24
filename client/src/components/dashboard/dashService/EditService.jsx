import React, { useState } from "react";
import { useDispatch } from "react-redux";
import s from "./EditService.module.css";
import { updateService } from "../../../redux/actions/serviceActions";

const EditService = ({ service, handleCancel }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: service.name,
    description: service.description,
    price: service.price,
    preNeed: service.preNeed,
    disclaimers: service.disclaimers,
    features: service.features,
    isActive: service.isActive,
  });

  const handleSave = (e) => {
    e.preventDefault();
    dispatch(updateService(service));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  console.log(service);

  return (
    <div className={s.container}>
      <div className={s.editService}>
        <h2>Edit Service</h2>
        <form className={s.form} onSubmit={handleSave}>
          <div className={s.formGroup}>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} />
          </div>
          <div className={s.formGroup}>
            <label htmlFor="description">Description</label>
            <textarea name="description" id="description" value={formData.description} onChange={handleChange} />
          </div>
          <div className={s.formGroup}>
            <label htmlFor="price">Price</label>
            <input type="text" name="price" id="price" value={formData.price} onChange={handleChange} />
          </div>
          <div className={s.formGroup}>
            <label htmlFor="preNeed">Pre-Need</label>
            <input type="text" name="preNeed" id="preNeed" value={formData.preNeed} onChange={handleChange} />
          </div>
          <div className={s.formGroup}>
            <label htmlFor="disclaimers">Disclaimers</label>
            <textarea name="disclaimers" id="disclaimers" value={formData.disclaimers} onChange={handleChange} />
          </div>
          <div className={s.formGroup}>
            <label htmlFor="features">Features</label>
            <textarea name="features" id="features" value={formData.features} onChange={handleChange} />
          </div>
          <div className={s.formGroup}>
            <label htmlFor="isActive">Active</label>
            <input type="checkbox" name="isActive" id="isActive" checked={formData.isActive} onChange={handleChange} />
          </div>
          <button type="submit">Save</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </form>
      </div>
    </div>
  );
};


export default EditService;