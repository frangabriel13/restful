import React, { useState } from "react";
import { useDispatch } from "react-redux";
import s from "./CreateService.module.css";
import { createService } from "../../../redux/actions/serviceActions";
import { validateCreateService } from "../../../utils/validations";

const CreateService = ({ handleCancel }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    disclaimers: "",
    features: [""],
    isActive: true,
  });
  const [errors, setErrors] = useState({});

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

  // const addFeature = () => {
  //   setFormData({
  //     ...formData,
  //     features: [...formData.features, ""],
  //   });
  // };
  const addFeature = () => {
    // Verificar si el último feature está vacío
    if (formData.features[formData.features.length - 1].trim() !== "") {
      // Agregar un nuevo feature solo si el último no está vacío
      setFormData({
        ...formData,
        features: [...formData.features, ""]
      });
    }
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
    const validationErrors = validateCreateService(formData);
    if(Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    dispatch(createService(formData));
    handleCancel();
  };

  console.log(errors);

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
                {errors.name && <p className={s.error}>{errors.name}</p>}
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
                {errors.price && <p className={s.error}>{errors.price}</p>}
              </div>
            </div>
            <div className={s.divInput}>
              <label>Disclaimers</label>
              <textarea
                name="disclaimers"
                value={formData.disclaimers}
                onChange={handleChange}
              />
              {errors.disclaimers && <p className={s.error}>{errors.disclaimers}</p>}
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
            {errors.features && <p className={s.error}>{errors.features}</p>}
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