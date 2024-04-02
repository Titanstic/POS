import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { Api } from "./service/Api";
import { NavContextProvider } from "./context/NavContext";
import { AlertContextProvider } from "./context/AlertContext";
import { SearchContextProvider } from "./context/SearchContext";
import { ColorContextProvider } from "./context/ColorContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SearchContextProvider>
      <ColorContextProvider>
        <NavContextProvider>
          <AlertContextProvider>
            <ApiProvider api={Api}>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </ApiProvider>
          </AlertContextProvider>
        </NavContextProvider>
      </ColorContextProvider>
    </SearchContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
