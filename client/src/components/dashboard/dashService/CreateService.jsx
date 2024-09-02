import React, { useState } from "react";
import { useDispatch } from "react-redux";
import s from "./CreateService.module.css";
import { createService } from "../../../redux/actions/serviceActions";

const CreateService = ({ handleCancel }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    disclaimers: "",
    features: [""],
    isActive: true,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createService(formData));
    handleCancel();
  };

  return (
    <div className={s.container}>
      <h3>Create Service</h3>
      <form className={s.form} onSubmit={handleSubmit}>
        <div className={s.divNamePrice}>
          <div className={s.divInput}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className={s.divInput}>
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              step="0.01"
            />
          </div>
        </div>
        <div className={s.divInput}>
          <label>Disclaimers</label>
          <input
            type="text"
            name="disclaimers"
            value={formData.disclaimers}
            onChange={handleChange}
          />
        </div>
        <div className={s.divInput}>
          <label>Features</label>
          {/* <input
            type="text"
            name="features"
            value={formData.features}
            onChange={handleChange}
          /> */}
          {formData.features.map((feature, index) => (
            <div key={index} className={s.featureInput}>
              <input
                type="text"
                value={feature}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
              />
              <button type="button" onClick={() => removeFeature(index)}>
                Remove
              </button>
            </div>
          ))}
        </div>
        <button type="submit">Create</button>
        <button onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  )
};


export default CreateService;