import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./OrdersTable.module.css";
import { getOrders, deleteOrder, updateOrder, createOrdersFromExcel } from "../../../redux/actions/orderActions";
import { getFuneralHomes } from "../../../redux/actions/funeralHomeActions";
import { getServices } from "../../../redux/actions/serviceActions";
import { getUsers } from "../../../redux/actions/userActions";
import EditOrder from "./EditOrder";
import Pagination from "./pagination/Pagination";
import Filters from "./filters/Filters";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import UpdateModal from "./modals/UpdateModal";
import TrackingModal from "./modals/TrackingModal";
import ExcelModal from "./modals/ExcelModal";

const OrdersTable = ({ openModal }) => {
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
  const [funeralHome, setFuneralHome] = useState("");
  const [selectedTab, setSelectedTab] = useState("newInProgress");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedUpdates, setSelectedUpdates] = useState([]);
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [selectedTracking, setSelectedTracking] = useState([]);
  const [showExcelModal, setShowExcelModal] = useState(false);
  const [additionalStatus, setAdditionalStatus] = useState("");
  const limit = 12;

  const statusOptions = {
    newInProgress: ["new", "inProgress"],
    pending: ["pending"],
    soldNotSold: ["sold", "notSold"],
    noUpdates: ["inProgress"]
  };

  useEffect(() => {
    let status = "";
    if (selectedTab === "newInProgress") {
      status = "new,inProgress";
    } else if (selectedTab === "pending") {
      status = "pending";
    } else if (selectedTab === "soldNotSold") {
      status = "sold,notSold";
    } else if (selectedTab === "noUpdates") {
      status = "inProgress";
    }
    dispatch(getOrders(currentPage, limit, status, service, user, search, funeralHome, additionalStatus));
    dispatch(getFuneralHomes());
    dispatch(getServices());
    dispatch(getUsers());
  }, [dispatch, currentPage, limit, selectedTab, service, user, search, funeralHome, additionalStatus]);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    setCurrentPage(1);
    setAdditionalStatus("");
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

  const handleFuneralHomeChange = (e) => {
    setFuneralHome(e.target.value);
    setCurrentPage(1);
  };

  const handleAdditionalStatusChange = (e) => {
    setAdditionalStatus(e.target.value);
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
    return service ? service.name.en : "Not sure";
  };

  const getUserName = (id) => {
    const user = users.find((user) => user.id === id);
    return user ? user.name : "N/A";
  };

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('T')[0].split('-');
    return `${month}-${day}-${year}`;
  };

  const handleEdit = (order) => {
    setSelectedOrder(order);
    setShowEdit(!showEdit);
  };

  const handleShowUpdates = (updates) => {
    setSelectedUpdates(updates);
    setShowUpdateModal(true);
  };

  const handleShowTracking = (tracking) => {
    setSelectedTracking(tracking);
    setShowTrackingModal(true);
  };

  const handleShowExcelModal = () => {
    setShowExcelModal(true);
  };

  const handleImportExcel = (data) => {
    dispatch(createOrdersFromExcel(data));
    setShowExcelModal(false);
  };

  const totalPages = Math.ceil(totalOrders / limit);

  const handleUpdateOrder = (orderId, formData) => {
    dispatch(updateOrder(orderId, formData));
  };

  // Función para asignar la clase según el estado
  const getStatusClass = (status) => {
    switch (status) {
      case "new":
        return s.rowNew;
      case "inProgress":
        return s.rowInProgress;
      case "pending":
        return s.rowPending;
      case "notSold":
        return s.rowNotSold;
      default:
        return "";
    }
  };

  return (
    <div className={s.dashboard}>
      <div className={s.divTitle}>
        <h2>Orders</h2>
        <div className={s.divBtnOrder}>
          <button onClick={openModal}>Create</button>
          <button onClick={handleShowExcelModal}>Import</button>
        </div>
      </div>
      <div className={s.tabs}>
        <button className={selectedTab === "newInProgress" ? s.active : ""} onClick={() => handleTabChange("newInProgress")}>New - in Progress</button>
        <button className={selectedTab === "pending" ? s.active : ""} onClick={() => handleTabChange("pending")}>Pending</button>
        <button className={selectedTab === "soldNotSold" ? s.active : ""} onClick={() => handleTabChange("soldNotSold")}>Sold - Not Sold</button>
        <button className={selectedTab === "noUpdates" ? s.active : ""} onClick={() => handleTabChange("noUpdates")}>No Updates (7+ days)</button>
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
        funeralHome={funeralHome}
        funeralHomes={funeralHomes}
        handleFuneralHomeChange={handleFuneralHomeChange}
        additionalStatus={additionalStatus}
        handleAdditionalStatusChange={handleAdditionalStatusChange}
        statusOptions={statusOptions[selectedTab]}
      />
      <div className={s.tableContainer}>
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
                <td className={getStatusClass(order.status)}>{order.status}</td>
                <td>
                  {order.statusDate.date ? formatDate(order.statusDate.date) : 'Fecha no disponible'} by {order.statusDate.updatedBy}
                </td>
                <td>
                  <button className={s.btnMore} onClick={() => handleShowUpdates(order.updates)}>Ver más</button>
                </td>
                <td>{order.insurance}</td>
                <td>{getFuneralHomeName(order.funeralHomeId)}</td>
                <td>
                  <button className={s.btnMore} onClick={() => handleShowTracking(order.tracking)}>Ver más</button>
                </td>
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
                <td>{order.comission}</td>
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
      </div>
      {showEdit && <EditOrder order={selectedOrder} onClose={() => setShowEdit(false)} updateOrder={handleUpdateOrder} />}
      {showUpdateModal && <UpdateModal updates={selectedUpdates} onClose={() => setShowUpdateModal(false)} />}
      {showTrackingModal && <TrackingModal tracking={selectedTracking} onClose={() => setShowTrackingModal(false)} />}
      {showExcelModal && <ExcelModal onClose={() => setShowExcelModal(false)} onImport={handleImportExcel} />}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
};

export default OrdersTable;

