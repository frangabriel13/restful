import React, { useState } from "react";
import { useDispatch } from "react-redux";
import s from "./CreateService.module.css";
import { createService } from "../../../redux/actions/serviceActions";

const CreateService = ({ handleCancel }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    preNeed: "",
    disclaimers: "",
    features: "",
    isActive: true,
  });

  return (
    <div>
      <h3>Create</h3>
    </div>
  )
};


export default CreateService;