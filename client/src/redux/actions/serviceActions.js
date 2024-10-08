// import { instance } from "../../utils/axiosConfig";

// export const getServices = () => async (dispatch) => {
//   try {
//     const response = await instance.get("services");
//     dispatch({
//       type: "GET_SERVICES",
//       payload: response.data,
//     });
//   } catch(error) {
//     console.error(error);
//   }
// };

// export const updateService = (id, service) => async (dispatch) => {
//   try {
//     console.log("service", service);
//     console.log("id", id);
//     const response = await instance.put(`services/${id}`, service);
//     dispatch({
//       type: "UPDATE_SERVICE",
//       payload: response.data,
//     })
//   } catch(error) {
//     console.log(error);
//   }
// };

// export const createService = (service) => async (dispatch) => {
//   try {
//     const response = await instance.post("services", service);
//     dispatch({
//       type: "CREATE_SERVICE",
//       payload: response.data,
//     });
//   } catch(error) {
//     console.error(error);
//   }
// };

// export const deleteService = (id) => async (dispatch) => {
//   try {
//     await instance.delete(`services/${id}`);
//     dispatch({
//       type: "DELETE_SERVICE",
//       payload: id,
//     });
//   } catch(error) {
//     console.error(error);
//   }
// }
import { instance } from "../../utils/axiosConfig";

export const getServices = () => async (dispatch) => {
  try {
    const response = await instance.get(`services`);
    dispatch({
      type: "GET_SERVICES",
      payload: response.data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const updateService = (id, service) => async (dispatch) => {
  try {
    console.log("service", service);
    console.log("id", id);
    const response = await instance.put(`services/${id}`, service);
    dispatch({
      type: "UPDATE_SERVICE",
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createService = (service) => async (dispatch) => {
  try {
    const response = await instance.post(`services`, service);
    dispatch({
      type: "CREATE_SERVICE",
      payload: response.data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const deleteService = (id) => async (dispatch) => {
  try {
    await instance.delete(`services/${id}`);
    dispatch({
      type: "DELETE_SERVICE",
      payload: id,
    });
  } catch (error) {
    console.error(error);
  }
};