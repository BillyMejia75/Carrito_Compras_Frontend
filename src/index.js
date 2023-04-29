import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/scss/bootstrap.scss";
import App from "./App";

import { store } from "./app/store.js";
import { Provider } from "react-redux";

//Agregar donde lo ocuparé
//import '@coreui/coreui/dist/css/coreui.min.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
