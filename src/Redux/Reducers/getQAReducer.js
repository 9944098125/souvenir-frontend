import { GET_QA_START, GET_QA_SUCCESS, GET_QA_ERROR } from "../Actions/Types";

const initialState = {
  questionsArray: [],
  successMsg: "",
  errorMsg: "",
  loading: false,
};

export default function getQAReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_QA_START:
      return {
        ...state,
        loading: true,
      };
    case GET_QA_SUCCESS:
      return {
        ...state,
        questionsArray: payload,
        errorMsg: "",
        successMsg: "Fetched QA successfully",
        loading: false,
      };
    case GET_QA_ERROR:
      return {
        ...state,
        errorMsg: "Please do select some tool of your choice...",
        loading: false,
      };
    default:
      return state;
  }
}
