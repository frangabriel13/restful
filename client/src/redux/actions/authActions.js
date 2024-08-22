import { instance } from "../../utils/axiosConfig";

//Solo creé el action para tener una referencia de como se vería
export const login = (data) => async (dispatch) => {
  try {
    const response = await instance.post("/login", data);
    dispatch({
      type: "LOGIN",
      payload: response.data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const logout = () => async (dispatch) => {
  try {
    await instance.post("/logout");
    dispatch({
      type: "LOGOUT",
    });
  } catch (error) {
    console.error(error);
  }
};

export const registerAdmin = (data) => async (dispatch) => {
  try {
    const response = await instance.post("/register", data);
    dispatch({
      type: "REGISTER_ADMIN",
      payload: response.data,
    });
  } catch(error) {
    console.error(error);
  }
};