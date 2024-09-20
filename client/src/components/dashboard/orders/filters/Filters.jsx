import React from "react";
import s from "./Filters.module.css";

const Filters = ({ status, handleStatusChange, service, handleServiceChange, services, user, handleUserChange, users, search, handleSearchChange }) => {
  return (
    <div className={s.container}>
      {/* <div className={s.divFilter}>
        <label htmlFor="statusFilter">Status: </label>
        <select id="statusFilter" value={status} onChange={handleStatusChange}>
          <option value="">All</option>
          <option value="new">New</option>
          <option value="inProgress">In Progress</option>
          <option value="pending">Pending</option>
          <option value="sold">Sold</option>
          <option value="notSold">Not Sold</option>
        </select>
      </div> */}
      <div className={s.divFilter}>
        <label htmlFor="serviceFilter">Service: </label>
        <select id="serviceFilter" value={service} onChange={handleServiceChange}>
          <option value="">All</option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name}
            </option>
          ))}
        </select>
      </div>
      <div className={s.divFilter}>
        <label htmlFor="userFilter">Assigned User: </label>
        <select id="userFilter" value={user} onChange={handleUserChange}>
          <option value="">All</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
      <div className={s.divFilter}>
        <label htmlFor="searchFilter">Search: </label>
        <input
          type="text"
          id="searchFilter"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search..."
        />
      </div>
    </div>
  );
};


export default Filters;