import React from "react";
import s from "./Filters.module.css";

const Filters = ({ 
  status, 
  handleStatusChange, 
  service, 
  handleServiceChange, 
  services, 
  user, 
  handleUserChange, 
  users, 
  search, 
  handleSearchChange, 
  funeralHomes, 
  handleFuneralHomeChange, 
  funeralHome, 
  additionalStatus, 
  handleAdditionalStatusChange,
  statusOptions }) => {
  return (
    <div className={s.container}>
      <div className={s.divFilter}>
        <label htmlFor="additionalStatusFilter">Filter by Status: </label>
        <select id="additionalStatusFilter" value={additionalStatus} onChange={handleAdditionalStatusChange}>
          <option value="">All</option>
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
      <div className={s.divFilter}>
        <label htmlFor="serviceFilter">Service: </label>
        <select id="serviceFilter" value={service} onChange={handleServiceChange}>
          <option value="">All</option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name.en}
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
        <label htmlFor="funeralHomeFilter">Funeral Home: </label>
        <select id="funeralHomeFilter" value={funeralHome} onChange={handleFuneralHomeChange}>
          <option value="">All</option>
          {
            funeralHomes.map((funeralHome) => (
              <option key={funeralHome.id} value={funeralHome.id}>
                {funeralHome.name}
              </option>
            ))
          }
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