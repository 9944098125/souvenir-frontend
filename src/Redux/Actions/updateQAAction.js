import api from "../Api/Api";
import { alertActions } from "./alertActions";
import { UPDATE_QA_ERROR, UPDATE_QA_START, UPDATE_QA_SUCCESS } from "./Types";


export const updateQAAction = (qaId, body) => async dispatch => {
    dispatch({
        type:UPDATE_QA_START
    })
    try{
        const res = await api.put('/qa/updateQA/' + qaId, body);
        // console.log('update res: ', res);
        if (res) {
            dispatch({
                type:UPDATE_QA_SUCCESS,
                payload:res.data && res.data
            });
             dispatch(
               alertActions.success(
                 "Updated the question and answer successfully..."
               )
             );
             setTimeout(() => {
               dispatch(alertActions.success_clear());
               dispatch(alertActions.clear());
             }, 3000);
        }
    }catch(err) {
        console.log('update error', err);
        dispatch({
            type:UPDATE_QA_ERROR,
            payload:err.response.message
        });
    }
}