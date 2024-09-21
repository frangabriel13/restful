import React, { useState } from "react";
import { useDispatch } from "react-redux";
import s from "./CreateFuneral.module.css";
import { createFuneralHome } from "../../../redux/actions/funeralHomeActions";
import { validateCreateFuneral } from "../../../utils/validations";

const CreateFuneral = ({ handleCancel }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateCreateFuneral(formData);
    if(Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    dispatch(createFuneralHome(formData));
    handleCancel();
  };

  return (
    <div className={s.container}>
      <h3>Create Funeral Home</h3>
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
            </div>
          </div>
        </div>
        <div className={s.divBtn}>
          <button className={s.btnCreate} type="submit">Create</button>
          <button className={s.btnCancel} onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  )
}


export default CreateFuneral;