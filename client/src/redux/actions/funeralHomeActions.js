import { instance } from "../../utils/axiosConfig";

export const getFuneralHomes = () => async (dispatch) => {
  try {
    const response = await instance.get("funeral-homes");
    dispatch({
      type: "GET_FUNERAL_HOMES",
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
      type: "UPDATE_FUNERAL_HOME",
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
      type: "CREATE_FUNERAL_HOME",
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
      type: "DELETE_FUNERAL_HOME",
      payload: id,
    });
  } catch(error) {
    console.error(error);
  }
};