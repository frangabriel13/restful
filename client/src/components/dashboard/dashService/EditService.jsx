// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import s from "./CreateService.module.css";
// import { updateService } from "../../../redux/actions/serviceActions";
// import { validateCreateService } from "../../../utils/validations";

// const EditService = ({ service, handleCancel }) => {
//   const dispatch = useDispatch();
//   const [formData, setFormData] = useState({
//     name: service.name,
//     price: service.price,
//     disclaimers: service.disclaimers,
//     features: service.features,
//     isActive: service.isActive,
//   });
//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFeatureChange = (index, value) => {
//     const newFeatures = [...formData.features];
//     newFeatures[index] = value;
//     setFormData({
//       ...formData,
//       features: newFeatures,
//     });
//   };

//   const addFeature = () => {
//     if (formData.features[formData.features.length - 1].trim() !== "") {
//       setFormData({
//         ...formData,
//         features: [...formData.features, ""]
//       });
//     }
//   };

//   const removeFeature = (index) => {
//     const newFeatures = formData.features.filter((feature, i) => i !== index);
//     setFormData({
//       ...formData,
//       features: newFeatures,
//     });
//   };

//   const handleSave = (e) => {
//     e.preventDefault();
//     const validationErrors = validateCreateService(formData);
//     if(Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }
//     dispatch(updateService(service.id, formData));
//     handleCancel();
//   };

//   console.log('formData', formData);

//   return (
//     <div className={s.container}>
//       <h3>Edit Service</h3>
//       <form className={s.form} onSubmit={handleSave}>
//         <div className={s.divForm}>
//           <div className={s.divNamePriceDis}>
//             <div className={s.divNamePrice}>
//               <div className={s.divInput}>
//                 <label>Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                 />
//                 {errors.name && <p className={s.error}>{errors.name}</p>}
//               </div>
//               <div className={s.divInput}>
//                 <label>Price</label>
//                 <input
//                   type="number"
//                   name="price"
//                   value={formData.price}
//                   onChange={handleChange}
//                   step="0.01"
//                 />
//                 {errors.price && <p className={s.error}>{errors.price}</p>}
//               </div>
//             </div>
//             <div className={s.divInput}>
//               <label>Disclaimers</label>
//               <textarea
//                 name="disclaimers"
//                 value={formData.disclaimers}
//                 onChange={handleChange}
//               />
//               {errors.disclaimers && <p className={s.error}>{errors.disclaimers}</p>}
//             </div>
//           </div>
//           <div className={s.divFeatures}>
//             <label>Features</label>
//             <div className={s.featureInput}>
//               <input
//                 type="text"
//                 value={formData.features[formData.features.length - 1]}
//                 onChange={(e) => handleFeatureChange(formData.features.length - 1, e.target.value)}
//               />
//               <button type="button" onClick={addFeature}>+</button>
//             </div>
//             {
//               formData.features.slice(0, -1).map((feature, index) => (
//                 <div key={index} className={s.featureItem}>
//                   <span>{feature}</span>
//                   <button type="button" onClick={() => removeFeature(index)}>-</button>
//                 </div>
//               ))
//             }
//             {errors.features && <p className={s.error}>{errors.features}</p>}
//           </div>
//         </div>
//         <div className={s.divBtn}>
//           <button className={s.btnCreate} type="submit">Save</button>
//           <button className={s.btnCancel} onClick={handleCancel}>Cancel</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default EditService;

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import s from "./CreateService.module.css";
import { updateService } from "../../../redux/actions/serviceActions";
import { validateCreateService } from "../../../utils/validations";

const EditService = ({ service, handleCancel }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: service.name,
    price: service.price,
    disclaimers: service.disclaimers,
    features: service.features,
    isActive: service.isActive,
  });
  const [errors, setErrors] = useState({});

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

  const handleFeatureChange = (lang, index, value) => {
    const newFeatures = [...formData.features[lang]];
    newFeatures[index] = value;
    setFormData({
      ...formData,
      features: {
        ...formData.features,
        [lang]: newFeatures,
      },
    });
  };

  const addFeature = (lang) => {
    if (formData.features[lang][formData.features[lang].length - 1].trim() !== "") {
      setFormData({
        ...formData,
        features: {
          ...formData.features,
          [lang]: [...formData.features[lang], ""],
        },
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

  const handleSave = (e) => {
    e.preventDefault();
    const validationErrors = validateCreateService(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    dispatch(updateService(service.id, formData));
    handleCancel();
  };

  console.log('formData', formData);

  return (
    <div className={s.container}>
      <h3>Edit Service</h3>
      <form className={s.form} onSubmit={handleSave}>
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
                value={formData.features.es[formData.features.es.length - 1]}
                onChange={(e) => handleFeatureChange("es", formData.features.es.length - 1, e.target.value)}
              />
              <button type="button" onClick={() => addFeature("es")}>+</button>
            </div>
            {formData.features.es.slice(0, -1).map((feature, index) => (
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
                value={formData.features.en[formData.features.en.length - 1]}
                onChange={(e) => handleFeatureChange("en", formData.features.en.length - 1, e.target.value)}
              />
              <button type="button" onClick={() => addFeature("en")}>+</button>
            </div>
            {formData.features.en.slice(0, -1).map((feature, index) => (
              <div key={index} className={s.featureItem}>
                <span>{feature}</span>
                <button type="button" onClick={() => removeFeature("en", index)}>-</button>
              </div>
            ))}
            {errors.features && <p className={s.error}>{errors.features.en}</p>}
          </div>
        </div>
        <div className={s.divBtn}>
          <button className={s.btnCreate} type="submit">Save</button>
          <button className={s.btnCancel} onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditService;