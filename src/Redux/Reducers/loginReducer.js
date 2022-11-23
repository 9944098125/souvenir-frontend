import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "../Actions/Types";
import jwtDecode from "jwt-decode";

const initialState = {
  user:{},
  token:localStorage.getItem('token'),
  isAuthenticated: localStorage.getItem("token") ? true : false,
  loading: false,
  loginFailMessage: "",
};

export default function auth(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_START:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
       const decodedToken = jwtDecode(payload);
      //  console.log(decodedToken, "is the user info");
      // user info other than token comes in the decodedToken
       const id = decodedToken.userId;
       const username = decodedToken.username;
       localStorage.setItem("user", username);
       localStorage.setItem("isActivated", true);
       localStorage.setItem("token", payload);
       localStorage.setItem("user_id", id);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
        user: decodedToken,
        token:payload,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        ...payload,
        loginFailMessage: payload,
      };
    case LOGOUT:
      localStorage.removeItem('user');
      localStorage.removeItem('user_id');
      localStorage.removeItem("token");
      localStorage.removeItem("isActivated");
      return {
        user: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
}
