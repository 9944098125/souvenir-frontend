import { SIGNUP_FAIL, SIGNUP_START, SIGNUP_SUCCESS } from "./Types";
import api from "../Api/Api";
import { alertActions } from "./alertActions";

export const signupAction = (data) => async (dispatch) => {
  try {
    dispatch({
      type: SIGNUP_START,
    });
    const res = await api.post("/auth/register", data);
    if (res) {
      // console.log('response: ', res);
      dispatch({
        type: SIGNUP_SUCCESS,
        payload: res && res.message,
      });
      dispatch(alertActions.success(res.data.message));
      setTimeout(() => {
        dispatch(alertActions.success_clear());
        dispatch(alertActions.clear());
      }, 3000);
    }
  } catch (err) {
    dispatch({
      type: SIGNUP_FAIL,
      payload: err.error,
    });
    // console.log('coming here', err)
    dispatch(alertActions.error(err.response.data));
    setTimeout(() => {
      dispatch(alertActions.error_clear());
      dispatch(alertActions.clear());
    }, 3000);
  }
};
