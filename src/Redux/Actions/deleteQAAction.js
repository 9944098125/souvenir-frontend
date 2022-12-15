import api from "../Api/Api";
import { alertActions } from "./alertActions";
import { DELETE_QA_START, DELETE_QA_ERROR, DELETE_QA_SUCCESS } from "./Types";

export const deleteQAAction = (qaId) => async (dispatch) => {
  dispatch({
    type: DELETE_QA_START,
  });
  try {
    const res = await api.delete("/qa/deleteQA/" + qaId);
    if (res) {
      // console.log('delete response: ', res);
      dispatch({
        type: DELETE_QA_SUCCESS,
        payload: res.data && res.data.message,
      });
      dispatch(
        alertActions.success("Deleted Question and Answer successfully")
      );
      setTimeout(() => {
        dispatch(alertActions.success_clear());
        dispatch(alertActions.clear());
      }, 3000);
      // window.location.reload();
    }
  } catch (err) {
    console.log("delete error: ", err);
    dispatch({
      type: DELETE_QA_ERROR,
      payload: err.response.message,
    });
    dispatch(alertActions.error("Something went wrong..."));
    setTimeout(() => {
      dispatch(alertActions.error_clear());
      dispatch(alertActions.clear());
    }, 3000);
  }
};
