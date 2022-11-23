import { UPDATE_QA_ERROR, UPDATE_QA_START, UPDATE_QA_SUCCESS } from "../Actions/Types";


const initialState = {
    updateResponse:{},
    errorMsg:'',
    loading:false
}

export default function updateQAReducer(state=initialState, action) {
    const {type, payload} = action
    switch(type) {
        case UPDATE_QA_START:
            return {
                ...state,
                loading:true
            }
        case UPDATE_QA_SUCCESS:
            return {
                ...state,
                updateResponse:payload,
                loading:false
            }
        case UPDATE_QA_ERROR:
            return {
                ...state,
                loading:false,
                errorMsg:payload
            }
        default:
            return state
    }
}