import { combineReducers } from "redux";

import { alert } from "./alertReducer";
import getQAReducer from "./getQAReducer";
import createQAReducer from "./createQAReducer";
import deleteQAReducer from './deleteQAReducer';
import updateQAReducer from './updateQAReducer'
import auth from "./loginReducer";
import signup from './signupReducer';

export default combineReducers({
    alert,
    getQAReducer,
    createQAReducer,
    deleteQAReducer,
    updateQAReducer,
    auth,
    signup,
});