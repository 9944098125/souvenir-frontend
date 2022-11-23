import { GET_QA_START, GET_QA_SUCCESS, GET_QA_ERROR } from "./Types";
import api from "../Api/Api";
import { alertActions } from "./alertActions";

export const getQAAction = (userId, toolId) => async (dispatch) => {
  dispatch({
    type: GET_QA_START,
  });
  try {
    const res = await api.get(`/qa/getQA/${userId}/${toolId}`);
    if (res) {
      // console.log('get question response: ', res);
      dispatch({
        type: GET_QA_SUCCESS,
        payload: res && res.data,
      });
    }
  } catch (err) {
    // console.log('get question error: ', err);
    dispatch({
      type: GET_QA_ERROR,
      payload: err.message,
    });
    // dispatch(alertActions.error('Please select a tool of your choice...'));
    setTimeout(() => {
      dispatch(alertActions.error_clear());
      dispatch(alertActions.clear());
    }, 3000);
  }
};
