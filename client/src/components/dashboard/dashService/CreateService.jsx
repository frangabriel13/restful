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

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({
      ...formData,
      features: newFeatures,
    });
  };

  const addFeature = () => {
    setFormData({
      ...formData,
      features: [...formData.features, ""],
    });
  };

  const removeFeature = (index) => {
    const newFeatures = formData.features.filter((feature, i) => i !== index);
    setFormData({
      ...formData,
      features: newFeatures,
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
          <div className={s.divFeatures}>
            <label>Features</label>
            <div className={s.featureInput}>
              <input
                type="text"
                value={formData.features[formData.features.length - 1]}
                onChange={(e) => handleFeatureChange(formData.features.length - 1, e.target.value)}
              />
              <button type="button" onClick={addFeature}>+</button>
            </div>
            {
              formData.features.slice(0, -1).map((feature, index) => (
                <div key={index} className={s.featureItem}>
                  <span>{feature}</span>
                  <button type="button" onClick={() => removeFeature(index)}>-</button>
                </div>
              ))
            }
          </div>
        </div>
        <div className={s.divBtn}>
          <button className={s.btnCreate} type="submit">Create</button>
          <button className={s.btnCancel} onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  )
};


export default CreateService;