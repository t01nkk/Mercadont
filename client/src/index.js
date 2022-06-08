import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./config/i18next-config"; // Con esto ya está invocado para usarse en cualquier parte.
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { StoreProvider } from "./context/store";
import { AuthProvider } from "./context/authContext";
import { initialState } from "./redux/reducer/reducer";
import reducer from "./redux/reducer/reducer";

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider initialState={initialState} reducer={reducer}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </StoreProvider>
  </React.StrictMode>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
