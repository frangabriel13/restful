import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./OrdersTable.module.css";
import { getOrders, deleteOrder } from "../../../redux/actions/orderActions";
import { getFuneralHomes } from "../../../redux/actions/funeralHomeActions";
import { getServices } from "../../../redux/actions/serviceActions";
import { getUsers } from "../../../redux/actions/userActions";
import EditOrder from "./EditOrder";
import Pagination from "./pagination/Pagination";
import Filters from "./filters/Filters";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import UpdateModal from "./modals/UpdateModal";

const OrdersTable = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders);
  const totalOrders = useSelector((state) => state.order.totalOrders);
  const funeralHomes = useSelector((state) => state.funeralHome.funeralHomes);
  const services = useSelector((state) => state.service.services);
  const users = useSelector((state) => state.user.users);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [service, setService] = useState("");
  const [user, setUser] = useState("");
  const [search, setSearch] = useState("");
  const [selectedTab, setSelectedTab] = useState("pending");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedUpdates, setSelectedUpdates] = useState([]);
  const limit = 12;

  useEffect(() => {
    let status = "";
    if (selectedTab === "pending") {
      status = "new,pending";
    } else if (selectedTab === "inProgress") {
      status = "inProgress";
    } else if (selectedTab === "soldNotSold") {
      status = "sold,notSold";
    }
    dispatch(getOrders(currentPage, limit, status, service, user, search));
    dispatch(getFuneralHomes());
    dispatch(getServices());
    dispatch(getUsers());
  }, [dispatch, currentPage, limit, selectedTab, service, user, search]);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    setCurrentPage(1);
  };

  const handleServiceChange = (e) => {
    setService(e.target.value);
    setCurrentPage(1);
  };

  const handleUserChange = (e) => {
    setUser(e.target.value);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleDelete = (orderId) => {
    dispatch(deleteOrder(orderId));
  };

  const getFuneralHomeName = (id) => {
    const home = funeralHomes.find((home) => home.id === id);
    return home ? home.name : "N/A";
  };

  const getServiceName = (id) => {
    const service = services.find((service) => service.id === id);
    return service ? service.name : "Not sure";
  };

  const getUserName = (id) => {
    const user = users.find((user) => user.id === id);
    return user ? user.name : "N/A";
  };

  const formatDate = (dateString) => {
    return dateString.split('T')[0];
  };

  const handleEdit = (order) => {
    setSelectedOrder(order);
    setShowEdit(!showEdit);
  };

  const handleShowUpdates = (updates) => {
    setSelectedUpdates(updates);
    setShowUpdateModal(true);
  };

  const totalPages = Math.ceil(totalOrders / limit);

  console.log(orders);

  return (
    <div className={s.dashboard}>
      <h2>Orders</h2>
      <div className={s.tabs}>
        <button className={selectedTab === "pending" ? s.active : ""} onClick={() => handleTabChange("pending")}>Pending - New</button>
        <button className={selectedTab === "inProgress" ? s.active : ""} onClick={() => handleTabChange("inProgress")}>In Progress</button>
        <button className={selectedTab === "soldNotSold" ? s.active : ""} onClick={() => handleTabChange("soldNotSold")}>Sold - Not Sold</button>
      </div>
      <Filters 
        service={service}
        handleServiceChange={handleServiceChange}
        services={services}
        user={user}
        handleUserChange={handleUserChange}
        users={users}
        search={search}
        handleSearchChange={handleSearchChange}
      />
      <table className={s.table}>
        <thead>
          <tr>
            <th>Status</th>
            <th>Contact Day</th>
            <th>Updates</th>
            <th>Insurance</th>
            <th>Funeral Home</th>
            <th>Tracking</th>
            <th>Price</th>
            <th>Contact Name</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Relationship</th>
            <th>Service Type</th>
            <th>Deceased Name</th>
            <th>Age</th>
            <th>Source</th>
            <th>Assigned</th>
            <th>Comission</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.status}</td>
              <td>{formatDate(order.statusDate.date)} by {order.statusDate.updatedBy}</td>
              {/* <td>
                <ul>
                  {order.updates.map((update, index) => (
                    <li key={index}>
                      {formatDate(update.date)} by {update.updatedBy}
                    </li>
                  ))}
                </ul>
              </td> */}
              <td>
                <button onClick={() => handleShowUpdates(order.updates)}>Ver más</button>
              </td>
              <td>{order.insurance}</td>
              <td>{getFuneralHomeName(order.funeralHomeId)}</td>
              {/* <td>
                <ul>
                  {order.tracking.map((track, index) => (
                    <li key={index}>{track}</li>
                  ))}
                </ul>
              </td> */}
              <td>{order.price}</td>
              <td>{order.contactName}</td>
              <td>{order.phoneNumber}</td>
              <td>{order.email}</td>
              <td>{order.relationship}</td>
              <td>{getServiceName(order.serviceId)}</td>
              <td>{order.deceasedName}</td>
              <td>{order.age}</td>
              <td>{order.source}</td>
              <td>{getUserName(order.userId)}</td>
              <td>{order.comission.join(", ")}</td>
              <td>
                <div className={s.divIcons}>
                  <CiEdit onClick={() => handleEdit(order)} className={s.iconEdit} />
                  <MdDeleteOutline onClick={() => handleDelete(order.id)} className={s.iconDelete} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showEdit && <EditOrder order={selectedOrder} onClose={() => setShowEdit(false)} />}
      {showUpdateModal && <UpdateModal updates={selectedUpdates} onClose={() => setShowUpdateModal(false)} />}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
};

export default OrdersTable;