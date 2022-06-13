import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import MainRoutes from "./components/Routes";
import { Provider } from 'react-redux';
import { store } from './app/store';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //   <React.StrictMode>
  <>
    <BrowserRouter>
      <Provider store={store}>
        <MainRoutes/>
        <CssBaseline/>
      </Provider>
    </BrowserRouter>
  </>
  //   </React.StrictMode>
);
reportWebVitals();
