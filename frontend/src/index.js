import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer autoClose="2000" theme="colored" />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
