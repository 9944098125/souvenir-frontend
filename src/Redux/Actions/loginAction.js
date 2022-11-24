import api from "../Api/Api";
import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "./Types";
import { alertActions } from "./alertActions";

// admin login
export const login = (data) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_START,
    });
    const res = await api.post("/auth/login", data);
    console.log("success", res);
    if (res) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data && res.data.user,
      });
      //  console.log("dispatching", res);
    }
  } catch (err) {
    console.log("login error: ", err);
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response && err.response.data,
    });
    // console.log('error:', err)
    dispatch(alertActions.error(err.response.data));
    setTimeout(() => {
      dispatch(alertActions.error_clear());
      dispatch(alertActions.clear());
    }, 3000);
  }
};

//logout user
export const logout = (dispatch) => {
  dispatch({ type: LOGOUT });
};
