import React from 'react';
import s from './UpdateModal.module.css';

const UpdateModal = ({ updates, onClose }) => {
  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  console.log(updates);

  return (
    <div className={s.modal} onClick={handleClickOutside}>
      <div className={s.modalContent}>
        <button onClick={onClose} className={s.btnClose}>Cerrar</button>
        <div className={s.container}>
          <h3 className={s.title}>Updates</h3>
          <table className={s.table}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Updated By</th>
              </tr>
            </thead>
            <tbody>
              {updates.map((update) => (
                <tr key={update.id}>
                  <td>{new Date(update.date).toLocaleDateString()}</td>
                  <td>{new Date(update.date).toLocaleTimeString()}</td>
                  <td>{update.updatedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


export default UpdateModal;