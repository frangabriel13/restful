import { instance } from "../../utils/axiosConfig";

// export const getOrders = () => async (dispatch) => {
//   try {
//     const response = await instance.get("orders");
//     dispatch({
//       type: "GET_ORDERS",
//       payload: response.data,
//     });
//   } catch(error) {
//     console.error(error);
//   }
// };
export const getOrders = (page = 1, limit = 12) => async (dispatch) => {
  try {
    const response = await instance.get(`orders?page=${page}&limit=${limit}`);
    dispatch({
      type: "GET_ORDERS",
      payload: response.data.orders,
    });
    dispatch({
      type: "SET_TOTAL_ORDERS",
      payload: response.data.totalOrders,
    });
  } catch (error) {
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