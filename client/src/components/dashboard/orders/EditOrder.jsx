import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./EditOrder.module.css";
// import { updateOrder } from "../../../redux/actions/orderActions";
import { getFuneralHomes } from "../../../redux/actions/funeralHomeActions";
import { getServices } from "../../../redux/actions/serviceActions";
import { getUsers } from "../../../redux/actions/userActions";
import { validateOrderForm } from "../../../utils/validations";

const EditOrder = ({ order, onClose, updateOrder }) => {
  const dispatch = useDispatch();
  const funeralHomes = useSelector((state) => state.funeralHome.funeralHomes);
  const services = useSelector((state) => state.service.services);
  const users = useSelector((state) => state.user.users);
  const authUserName = useSelector((state) => state.auth.user.name);
  const [form, setForm] = useState({
    status: order.status || "new",
    insurance: order.insurance || "pending",
    funeralHomeId: order.funeralHomeId || "",
    tracking: order.tracking || [],
    price: order.price || "",
    contactName: order.contactName || "",
    phoneNumber: order.phoneNumber || "",
    email: order.email || "",
    comission: order.comission || "",
    relationship: order.relationship || "",
    deceasedName: order.deceasedName || "",
    age: order.age || "",
    serviceId: order.serviceId || "",
    userId: order.userId || "",
    source: order.source || "",
    updateBy: authUserName,
  });
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState({});

  // Ésto se solucionó cambiando el id de string a number porque al actualizar se cambiaba y no buscaba.
  // useEffect(() => {
  //   dispatch(getFuneralHomes());
  //   dispatch(getServices());
  //   dispatch(getUsers());
  // }, [dispatch]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const validationErrors = validateOrderForm(form);
  //   if (Object.keys(validationErrors).length > 0) {
  //     setErrors(validationErrors);
  //     return;
  //   }

  //   // dispatch(updateOrder(order.id, form));
  //   updateOrder(order.id, form);
  //   onClose();
  // };
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateOrderForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  
    const updatedForm = {
      ...form,
      funeralHomeId: form.funeralHomeId ? Number(form.funeralHomeId) : null,
      serviceId: form.serviceId ? Number(form.serviceId) : null,
      userId: form.userId ? Number(form.userId) : null,
    };
  
    // Remove keys with null values
    Object.keys(updatedForm).forEach(key => {
      if (updatedForm[key] === null) {
        delete updatedForm[key];
      }
    });
  
    updateOrder(order.id, updatedForm);
    onClose();
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const addComment = () => {
    if (comment.trim()) {
      const newComment = {
        date: new Date().toISOString(),
        track: comment.trim(),
      };
      setForm({
        ...form,
        tracking: [...form.tracking, newComment],
      });
      setComment("");
    }
  };

  const removeComment = (index) => {
    const newTracking = form.tracking.filter((_, i) => i !== index);
    setForm({
      ...form,
      tracking: newTracking,
    });
  };

  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={s.modal} onClick={handleClickOutside}>
      <div className={s.modalContent}>
        <button onClick={onClose} className={s.btnClose}>Cerrar</button>
        <div className={s.container}>
          <h3 className={s.title}>Edit Order</h3>
          <form onSubmit={handleSubmit} className={s.form}>
            <div className={s.divGroupFour}>
              <div className={s.formGroup}>
                <label htmlFor="status">Status</label>
                <select name="status" value={form.status} onChange={handleChange}>
                  <option value="new">New</option>
                  <option value="inProgress">In Progress</option>
                  <option value="pending">Pending</option>
                  <option value="sold">Sold</option>
                  <option value="notSold">Not Sold</option>
                </select>
              </div>
              <div className={s.formGroup}>
                <label htmlFor="insurance">Insurance</label>
                <select name="insurance" value={form.insurance} onChange={handleChange}>
                  <option value="pending">Pending</option>
                  <option value="GWIC">GWIC</option>
                  <option value="CMT">CMT</option>
                </select>
              </div>
              <div className={s.formGroup}>
                <label htmlFor="funeralHomeId">Funeral Home</label>
                <select name="funeralHomeId" value={form.funeralHomeId} onChange={handleChange}>
                  <option value="">Select Funeral Home</option>
                  {funeralHomes.map((home) => (
                    <option key={home.id} value={home.id}>
                      {home.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className={s.formGroup}>
                <label htmlFor="serviceId">Service</label>
                <select name="serviceId" value={form.serviceId} onChange={handleChange}>
                  <option value="">Select Service</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name.en}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className={s.divGroupFour}>
              <div className={s.formGroup}>
                <label htmlFor="price">Price or Comment</label>
                <input type="text" name="price" value={form.price} onChange={handleChange} placeholder="Price or Comment" className={s.input} />
              </div>
              <div className={s.formGroup}>
                <label htmlFor="contactName">Contact Name</label>
                <input type="text" name="contactName" value={form.contactName} onChange={handleChange} placeholder="Contact Name" className={s.input} />
                { errors.contactName && <p className={s.error}>{errors.contactName}</p> }
              </div>
              <div className={s.formGroup}>
                <label htmlFor="phoneNumber">Phone Number</label>
                <input type="text" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} placeholder="Phone Number" className={s.input} />
                { errors.phoneNumber && <p className={s.error}>{errors.phoneNumber}</p> }
              </div>
              <div className={s.formGroup}>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" className={s.input} />
              </div>
            </div>
            <div className={s.divGroupFour}>
              <div className={s.formGroup}>
                <label htmlFor="relationship">Relationship</label>
                <input type="text" name="relationship" value={form.relationship} onChange={handleChange} placeholder="Relationship" className={s.input} />
              </div>
              <div className={s.formGroup}>
                <label htmlFor="deceasedName">Deceased Name</label>
                <input type="text" name="deceasedName" value={form.deceasedName} onChange={handleChange} placeholder="Deceased Name" className={s.input} />
              </div>
              <div className={s.formGroup}>
                <label htmlFor="age">Age</label>
                <input type="number" name="age" value={form.age} onChange={handleChange} placeholder="Age" className={s.input} />
              </div>
              <div className={s.formGroup}>
                <label htmlFor="source">Source</label>
                <input type="text" name="source" value={form.source} onChange={handleChange} placeholder="Source" className={s.input} />
              </div>
            </div>
            <div className={s.divGroupThree}>
              <div className={s.formGroup}>
                <label htmlFor="userId">Admin</label>
                <select name="userId" value={form.userId} onChange={handleChange}>
                  <option value="">Select Admin</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className={s.formGroup}>
                <label htmlFor="comission">Comission</label>
                <input
                  type="text"
                  name="comission"
                  value={form.comission}
                  onChange={handleChange}
                  placeholder="Comission"
                  className={s.input}
                />
              </div>
              <div className={s.formGroup}>
                <h4>Tracking</h4>
                <input
                  type="text"
                  value={comment}
                  onChange={handleCommentChange}
                  placeholder="Add a comment"
                  className={s.input}
                />
                <button type="button" onClick={addComment} className={s.button}>Add Comment</button>
                {form.tracking.map((track, index) => (
                  <div key={index} className={s.comment}>
                    <p>{track.track}</p>
                    <button type="button" onClick={() => removeComment(index)} className={s.removeButton}>Remove</button>
                  </div>
                ))}
              </div>
            </div>
            <div className={s.divBtnSubmit}>
              <button type="submit">Update Order</button>
              <button type="button" onClick={onClose}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
};


export default EditOrder;