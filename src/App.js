import "./App.css";
import React, { Fragment } from "react";
import BaseRoutes from "./Routing/routes";
import { Provider } from "react-redux";
import store from "./Redux/Store/Store";

function App() {
  return (
    <Fragment>
      <Provider store={store}>
        <BaseRoutes />
      </Provider>
    </Fragment>
  );
}

export default App;
