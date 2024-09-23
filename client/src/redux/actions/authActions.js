import { instance } from "../../utils/axiosConfig";
import { jwtDecode } from "jwt-decode";

export const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch(error) {
    console.log(error);
    return true;
  }
};

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

export const generateToken = (data) => async (dispatch) => {
  const token = localStorage.getItem('token');
  //   dispatch(logout());
  //   return {
  //     success: false,
  //     message: "Token expirado. Por favor, inicia sesión nuevamente.",
  //   };
  // }
  try {
    const response = await instance.post("/users/generate-token", data, {
      headers: {
        Authorization: `Bearer ${token}`, // Incluir el token JWT en los encabezados
      },
    });
    const registrationToken = response.data.token;
    const registrationLink = `https://www.eternalrestfulfuneralservices.com/dashboard/register/${registrationToken}?name=${encodeURIComponent(data.name)}`;
    
    dispatch({
      type: "GENERATE_TOKEN_SUCCESS",
      payload: { token: registrationToken, registrationLink },
    });

    return { success: true, registrationLink };
  } catch (error) {
    console.error(error);
    dispatch({
      type: "GENERATE_TOKEN_FAILURE",
      payload: error.response.data.message,
    });
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