import React, { useState } from "react";
import { useDispatch } from "react-redux";
import s from "./CreateUser.module.css";
import { generateToken } from "../../../redux/actions/authActions";
import { validateCreateFuneral } from "../../../utils/validations";

const CreateUser = ({ handleCancel }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
  });
  const [errors, setErrors] = useState({});
  const [registrationLink, setRegistrationLink] = useState("");
  const [copySuccess, setCopySuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateCreateFuneral(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const result = await dispatch(generateToken(formData));
    if (result.success) {
      setRegistrationLink(result.registrationLink);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(registrationLink).then(() => {
      setCopySuccess("Copied!");
      setTimeout(() => setCopySuccess(""), 2000);
    });
  };

  return (
    <div className={s.container}>
      <h3>Create User</h3>
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
          <button className={s.btnCreate} type="submit">Generate</button>
          <button className={s.btnCancel} onClick={handleCancel}>Cancel</button>
        </div>
      </form>
      {registrationLink && (
        <div className={s.registrationLink}>
          <p>Registration Link:</p>
          <a href={registrationLink} target="_blank" rel="noopener noreferrer">
            {registrationLink}
          </a>
          <div className={s.divCopy}>
            <button onClick={copyToClipboard} className={s.btnCopy}>Copy</button>
            {copySuccess && <p className={s.copySuccess}>{copySuccess}</p>}
          </div>
        </div>
      )}
    </div>
  )
};


export default CreateUser;