import { instance } from "../../utils/axiosConfig";

export const sendEmail = (email, subject, text) => async (dispatch) => {
  try {
    await instance.post("emails/send-email", { email, subject, text });
    dispatch({
      type: "SEND_EMAIL",
      payload: Response.data,
    });
  } catch (error) {
    console.error(error);
  }
};