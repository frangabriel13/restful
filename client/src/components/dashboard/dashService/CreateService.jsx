import React, { useState } from "react";
import { useDispatch } from "react-redux";
import s from "./CreateService.module.css";
import { createService } from "../../../redux/actions/serviceActions";
import { validateCreateService } from "../../../utils/validations";

const CreateService = ({ handleCancel }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: { es: "", en: "" },
    price: "",
    disclaimers: { es: "", en: "" },
    features: { es: [], en: [] },
    isActive: true,
  });
  const [errors, setErrors] = useState({});
  const [inputValues, setInputValues] = useState({
    es: '',
    en: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [field, lang] = name.split("_");
    setFormData({
      ...formData,
      [field]: {
        ...formData[field],
        [lang]: value,
      },
    });
  };

  const handleFeatureChange = (lang, value) => {
    setInputValues({
      ...inputValues,
      [lang]: value
    });
  };

  const addFeature = (lang) => {
    if (inputValues[lang].trim() !== "") {
      setFormData({
        ...formData,
        features: {
          ...formData.features,
          [lang]: [...formData.features[lang], inputValues[lang]],
        },
      });
      setInputValues({
        ...inputValues,
        [lang]: ''
      });
    }
  };

  const removeFeature = (lang, index) => {
    const newFeatures = formData.features[lang].filter((_, i) => i !== index);
    setFormData({
      ...formData,
      features: {
        ...formData.features,
        [lang]: newFeatures,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateCreateService(formData);
    if (Object.keys(validationErrors).length > 0) {
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
                <label>Name (ES)</label>
                <input
                  type="text"
                  name="name_es"
                  value={formData.name.es}
                  onChange={handleChange}
                />
                {errors.name && <p className={s.error}>{errors.name.es}</p>}
              </div>
              <div className={s.divInput}>
                <label>Name (EN)</label>
                <input
                  type="text"
                  name="name_en"
                  value={formData.name.en}
                  onChange={handleChange}
                />
                {errors.name && <p className={s.error}>{errors.name.en}</p>}
              </div>
              <div className={s.divInput}>
                <label>Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  step="0.01"
                />
                {errors.price && <p className={s.error}>{errors.price}</p>}
              </div>
            </div>
            <div className={s.divInput}>
              <label>Disclaimers (ES)</label>
              <textarea
                name="disclaimers_es"
                value={formData.disclaimers.es}
                onChange={handleChange}
              />
              {errors.disclaimers && <p className={s.error}>{errors.disclaimers.es}</p>}
            </div>
            <div className={s.divInput}>
              <label>Disclaimers (EN)</label>
              <textarea
                name="disclaimers_en"
                value={formData.disclaimers.en}
                onChange={handleChange}
              />
              {errors.disclaimers && <p className={s.error}>{errors.disclaimers.en}</p>}
            </div>
          </div>
          <div className={s.divFeatures}>
            <label>Features (ES)</label>
            <div className={s.featureInput}>
              <input
                type="text"
                value={inputValues.es}
                onChange={(e) => handleFeatureChange("es", e.target.value)}
              />
              <button type="button" onClick={() => addFeature("es")}>+</button>
            </div>
            {formData.features.es.map((feature, index) => (
              <div key={index} className={s.featureItem}>
                <span>{feature}</span>
                <button type="button" onClick={() => removeFeature("es", index)}>-</button>
              </div>
            ))}
            {errors.features && <p className={s.error}>{errors.features.es}</p>}
          </div>
          <div className={s.divFeatures}>
            <label>Features (EN)</label>
            <div className={s.featureInput}>
              <input
                type="text"
                value={inputValues.en}
                onChange={(e) => handleFeatureChange("en", e.target.value)}
              />
              <button type="button" onClick={() => addFeature("en")}>+</button>
            </div>
            {formData.features.en.map((feature, index) => (
              <div key={index} className={s.featureItem}>
                <span>{feature}</span>
                <button type="button" onClick={() => removeFeature("en", index)}>-</button>
              </div>
            ))}
            {errors.features && <p className={s.error}>{errors.features.en}</p>}
          </div>
        </div>
        <div className={s.divBtn}>
          <button className={s.btnCreate} type="submit">Create</button>
          <button className={s.btnCancel} onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};


export default CreateService;