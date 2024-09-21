import { instance } from "../../utils/axiosConfig";

export const getUsers = () => async (dispatch) => {
  try {
    const response = await instance.get("/users");
    dispatch({
      type: "GET_USERS",
      payload: response.data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    await instance.delete(`/users/${id}`);
    dispatch({
      type: "DELETE_USER",
      payload: id,
    });
  } catch (error) {
    console.error(error);
  }
};