import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import store from "./store";
import ErrorBoundary from "./components/ErrorBoundary";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    {/* <ErrorBoundary> */}
    <Provider store={store}>
      <App />
    </Provider>
    {/* </ErrorBoundary> */}
  </>
);
