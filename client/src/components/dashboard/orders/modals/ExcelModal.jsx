import React from "react";
import s from "./ExcelModal.module.css";

const ExcelModal = ({ onClose, onImport }) => {
  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={s.modal} onClick={handleClickOutside}>
      <div className={s.modalContent}>
        <button onClick={onClose} className={s.btnClose}>Close</button>
        <div className={s.container}>
          <h3>Excel Import</h3>
        </div>
      </div>
    </div>
  )
};


export default ExcelModal;