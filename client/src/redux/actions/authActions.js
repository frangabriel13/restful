import { instance } from "../../utils/axiosConfig";

export const login = (data) => async (dispatch) => {
  try {
    const response = await instance.post("/users/login", data);
    dispatch({
      type: "LOGIN",
      payload: {
        user: response.data.user,
        token: response.data.token,
      },
    });
    return { success: true };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: error.response.data.message,
      info: error.response.data.info,
    }
  }
};

export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem("token");
    dispatch({
      type: "LOGOUT",
    });
  } catch (error) {
    console.error(error);
  }
};

export const registerAdmin = (data) => async (dispatch) => {
  try {
    const response = await instance.post("/users/register", data);
    dispatch({
      type: "REGISTER_ADMIN",
      payload: response.data,
    });
  } catch(error) {
    console.error(error);
  }
};