import React from "react";
import s from "./Filters.module.css";

const Filters = ({ status, handleStatusChange }) => {
  return (
    <div>
      <label htmlFor="statusFilter">Filter by Status: </label>
      <select id="statusFilter" value={status} onChange={handleStatusChange}>
        <option value="">All</option>
        <option value="new">New</option>
        <option value="inProgress">In Progress</option>
        <option value="pending">Pending</option>
        <option value="sold">Sold</option>
        <option value="notSold">Not Sold</option>
      </select>
    </div>
  );
};


export default Filters;