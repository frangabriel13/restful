import React, { useState } from "react";
import { useDispatch } from "react-redux";
import s from "./CreateFuneral.module.css";
import { updateFuneralHome } from "../../../redux/actions/funeralHomeActions";
import { validateCreateFuneral } from "../../../utils/validations";

const EditFuneral = ({ funeralHome, handleCancel }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: funeralHome.name,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    const validationErrors = validateCreateFuneral(formData);
    if(Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    dispatch(updateFuneralHome(funeralHome.id, formData));
    handleCancel();
  };

  return (
    <div className={s.container}>
      <h3>Edit Funeral Home</h3>
      <form className={s.form} onSubmit={handleSave}>
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
          <button className={s.btnCreate} type="submit">Save</button>
          <button className={s.btnCancel} onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  )
};


export default EditFuneral;