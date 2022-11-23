import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "../Reducers";
import SetAuthToken from '../../Utils/SetAuthToken';

// const initialState = {};

// const middleware = [thunk];
const store = createStore(
  rootReducer,
  // initialState,
  composeWithDevTools(applyMiddleware(thunk)),
);

let currentState = store.getState();
// console.log("currentState", currentState);

store.subscribe(() => {
  // keep track of the previous and current state to compare changes
  let previousState = currentState;
  currentState = store.getState();
  // if the token changes set the value in localStorage and axios headers
  if (previousState.auth.token !== currentState.auth.token) {
    const token = currentState.auth.token;
    SetAuthToken(token);
  }
});


export default store