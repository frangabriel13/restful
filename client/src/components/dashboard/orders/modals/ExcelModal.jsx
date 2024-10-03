import React, { useState } from "react";
import s from "./ExcelModal.module.css";

const ExcelModal = ({ onClose, onImport }) => {
  const [file, setFile] = useState(null);

  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleImport = () => {
    if (file) {
      onImport(file);
      onClose();
    } else {
      console.error("No file selected");
    }
  };

  return (
    <div className={s.modal} onClick={handleClickOutside}>
      <div className={s.modalContent}>
        <button onClick={onClose} className={s.btnClose}>Close</button>
        <div className={s.container}>
          <h3>Excel Import</h3>
          <div className={s.form}>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleImport}>Import</button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default ExcelModal;