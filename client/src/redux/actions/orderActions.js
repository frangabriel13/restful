import { instance, instanceFile } from "../../utils/axiosConfig";

export const getOrders = (page = 1, limit = 12, status, service, user, search, funeralHome, additionalStatus) => async (dispatch) => {
  try {
    let url = `orders?page=${page}&limit=${limit}`;
    if(status) {
      url += `&status=${status}`;
    }
    if(service) {
      url += `&service=${service}`;
    }
    if(user) {
      url += `&user=${user}`;
    }
    if (search) {
      url += `&search=${search}`;
    }
    if (funeralHome) {
      url += `&funeralHome=${funeralHome}`;
    }
    if (additionalStatus) {
      url += `&additionalStatus=${additionalStatus}`;
    }
    const response = await instance.get(url);
    dispatch({
      type: "GET_ORDERS",
      payload: response.data.orders,
    });
    dispatch({
      type: "SET_TOTAL_ORDERS",
      payload: response.data.totalOrders,
    });
  } catch(error) {
    console.error(error);
  }
};

export const updateOrder = (id, order) => async (dispatch) => {
  try {
    console.log("order", order);
    const response = await instance.put(`orders/${id}`, order);
    dispatch({
      type: "UPDATE_ORDER",
      payload: response.data,
    });
  } catch(error) {
    console.error(error);
  }
};

export const createOrder = (order) => async (dispatch) => {
  try {
    console.log("order", order);
    const response = await instance.post("orders", order);
    dispatch({
      type: "CREATE_ORDER",
      payload: response.data,
    });
  } catch(error) {
    console.error(error);
  }
};

export const deleteOrder = (id) => async (dispatch) => {
  try {
    await instance.delete(`orders/${id}`);
    dispatch({
      type: "DELETE_ORDER",
      payload: id,
    });
  } catch(error) {
    console.error(error);
  }
};

export const createOrdersFromExcel = (file) => async (dispatch) => {
  try {
    console.log("file", file);
    const formData = new FormData();
    formData.append("file", file);
    const response = await instanceFile.post("orders/excel", formData);
    dispatch({
      type: "CREATE_ORDERS_FROM_EXCEL",
      payload: response.data,
    });
  } catch(error) {
    console.error(error);
  }
};

export const exportOrdersToExcel = () => async (dispatch) => {
  try {
    const response = await instanceFile.get("orders/export/excel", {
      responseType: 'blob' // Asegúrate de manejar la respuesta como un blob
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'orders.xlsx'); // Nombre del archivo a descargar
    document.body.appendChild(link);
    link.click();
    link.remove();
    dispatch({
      type: "EXPORT_ORDERS_TO_EXCEL",
    });
  } catch (error) {
    console.error(error);
  }
};