import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import enUS from "antd/lib/locale/en_US";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider locale={enUS}>
        {/** Set languages from Chinese to English entire project **/}
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>
);
