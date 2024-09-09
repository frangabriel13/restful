import { instance } from "../../utils/axiosConfig";

export const login = (data) => async (dispatch) => {
  try {
    const response = await instance.post("/users/login", data);
    const { user, token } = response.data;

    localStorage.setItem("token", token);

    dispatch({
      type: "LOGIN",
      payload: {
        user,
        token,
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

export const registerSuperAdmin = (data) => async (dispatch) => {
  try {
    const response = await instance.post("/users/register-superadmin", data);
    dispatch({
      type: "REGISTER_SUPERADMIN",
      payload: response.data,
    });
    return { success: true };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: error.response.data.message,
      info: error.response.data.info,
    };
  }
};

// export const registerAdmin = (data, token) => async (dispatch) => {
//   try {
//     const response = await instance.post("/users/register", data, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     dispatch({
//       type: "REGISTER_ADMIN",
//       payload: response.data,
//     });
//     return { success: true };
//   } catch (error) {
//     console.error(error);
//     return {
//       success: false,
//       message: error.response.data.message,
//       info: error.response.data.info,
//     };
//   }
// };

export const generateToken = (data) => async (dispatch) => {
  try {
    const response = await instance.post("/users/generate-token", data);
    return { success: true, token: response.data.token };
  } catch(error) {
    console.error(error);
    return {
      success: false,
      message: error.response.data.message,
    };
  }
};

export const registerAdminWithToken = (data, token) => async (dispatch) => {
  try {
    const response = await instance.post(`/users/register/${token}`, data);
    dispatch({
      type: "REGISTER_ADMIN",
      payload: response.data,
    });
    return { success: true };
  } catch(error) {
    console.error(error);
    return {
      success: false,
      message: error.response.data.message,
      info: error.response.data.info,
    };
  }
};