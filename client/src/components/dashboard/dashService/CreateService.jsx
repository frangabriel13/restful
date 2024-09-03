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
        <div className={s.divForm}>
          <div className={s.divNamePriceDis}>
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
              <textarea
                name="disclaimers"
                value={formData.disclaimers}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={s.divInput}>
            <label>Features</label>
            {
              formData.features.map((feature, index) => (
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
              ))
            }
          </div>
        </div>
        <div className={s.divBtn}>
          <button type="submit">Create</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  )
};


export default CreateService;