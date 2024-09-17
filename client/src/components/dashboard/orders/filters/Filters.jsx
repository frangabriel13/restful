import React from "react";
import s from "./Filters.module.css";

const Filters = ({ status, handleStatusChange, service, handleServiceChange, services, user, handleUserChange, users }) => {
  return (
    <div>
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
      <div>
        <label htmlFor="serviceFilter">Filter by Service: </label>
        <select id="serviceFilter" value={service} onChange={handleServiceChange}>
          <option value="">All</option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="userFilter">Filter by Assigned User: </label>
        <select id="userFilter" value={user} onChange={handleUserChange}>
          <option value="">All</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};


export default Filters;