import api from '../Api/Api';
import {alertActions} from './alertActions';
import { CREATE_QA_ERROR, CREATE_QA_START, CREATE_QA_SUCCESS } from './Types';


export const createQAAction = (body) => async (dispatch) => {
    dispatch({
        type:CREATE_QA_START,
    })
    try {
        const res = await api.post('/qa/createQA', body);
        if (res) {
            // console.log('create res', res);
            dispatch({
                type:CREATE_QA_SUCCESS,
                payload:res.data && res.data
            });
             dispatch(
               alertActions.success(
                 "Posted the question and answer successfully..."
               )
             );
             setTimeout(() => {
               dispatch(alertActions.success_clear());
               dispatch(alertActions.clear());
             }, 3000);
        }
    }catch(err) {
        console.log('create error', err);
        dispatch({
          type:CREATE_QA_ERROR,
          payload:err.data.message,
        })
    }
};