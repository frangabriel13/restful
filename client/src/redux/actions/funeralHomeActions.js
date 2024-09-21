import { instance } from "../../utils/axiosConfig";

export const getFuneralHomes = () => async (dispatch) => {
  try {
    const response = await instance.get("funeral-homes");
    dispatch({
      type: "GET_FUNERALHOMES",
      payload: response.data,
    });
  } catch(error) {
    console.error(error);
  }
};

export const updateFuneralHome = (id, funeralHome) => async (dispatch) => {
  try {
    const response = await instance.put(`funeral-homes/${id}`, funeralHome);
    dispatch({
      type: "UPDATE_FUNERALHOME",
      payload: response.data,
    });
  } catch(error) {
    console.error(error);
  }
};

export const createFuneralHome = (funeralHome) => async (dispatch) => {
  try {
    const response = await instance.post("funeral-homes", funeralHome);
    dispatch({
      type: "CREATE_FUNERALHOME",
      payload: response.data,
    });
  } catch(error) {
    console.error(error);
  }
};

export const deleteFuneralHome = (id) => async (dispatch) => {
  try {
    await instance.delete(`funeral-homes/${id}`);
    dispatch({
      type: "DELETE_FUNERALHOME",
      payload: id,
    });
  } catch(error) {
    console.error(error);
  }
};