import { CREATE_QA_ERROR, CREATE_QA_START, CREATE_QA_SUCCESS } from "../Actions/Types"

const initialState = {
    res:{},
    err:'',
    loading:false,
}

export default function createQAReducer(state=initialState, action) {
    const {type, payload} = action
    switch(type) {
        case CREATE_QA_START:
            return {
                ...state,
                loading:true,
            }
        case CREATE_QA_SUCCESS:
            return {
                ...state,
                loading:false,
                res:payload
            }
        case CREATE_QA_ERROR:
            return {
                ...state,
                loading:false,
                err:payload
            }
        default:
            return state
    }
}