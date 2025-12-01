import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import AppProvider from "./app/AppProvider";
import AppRouter from "./app/AppRouter";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProvider>
      <AppRouter />
    </AppProvider>
  </React.StrictMode>
);
