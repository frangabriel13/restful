import { instance } from "../../utils/axiosConfig";

export const getServices = () => async (dispatch) => {
  try {
    const response = await instance.get("services");
    dispatch({
      type: "GET_SERVICES",
      payload: response.data,
    });
  } catch (error) {
    console.error(error);
  }
};