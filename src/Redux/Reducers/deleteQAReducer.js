import {
  DELETE_QA_START,
  DELETE_QA_SUCCESS,
  DELETE_QA_ERROR,
} from "../Actions/Types";

const initialState = {
  response: "",
  error: "",
  loading: false,
};

export default function deleteQAReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case DELETE_QA_START:
      return {
        ...state,
        loading: true,
      };
    case DELETE_QA_SUCCESS:
      return {
        ...state,
        response: payload,
        loading: false,
      };
    case DELETE_QA_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
