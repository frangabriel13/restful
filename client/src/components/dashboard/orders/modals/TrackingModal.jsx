import React from "react";
import s from "./TrackingModal.module.css";

const TrackingModal = ({ tracking, onClose }) => {
  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  console.log('tracking:', tracking);

  return (
    <div className={s.modal} onClick={handleClickOutside}>
      <div className={s.modalContent}>
        <button className={s.btnClose} onClick={onClose}>Close</button>
        <div className={s.container}>
          <h3 className={s.title}>Tracking</h3>
          <div className={s.tableContainer}>
            <table className={s.table}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Comment</th>
                  <th>Created By</th>
                </tr>
              </thead>
              <tbody>
                {tracking.map((track) => (
                  <tr key={track.id}>
                    <td>{new Date(track.date).toLocaleDateString()}</td>
                    <td>{new Date(track.date).toLocaleTimeString()}</td>
                    <td>{track.track}</td>
                    <td>{track.createdBy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
};


export default TrackingModal;