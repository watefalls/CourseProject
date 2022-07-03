import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App";
import { Router } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { createStore } from "./store/createStore";
import { Provider } from "react-redux";
import history from "./utils/history";

const store = createStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
