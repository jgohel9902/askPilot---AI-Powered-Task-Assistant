import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles.css";

import SettingsProvider from "./context/SettingsProvider.jsx";
import ThemeProvider from "./context/ThemeProvider.jsx";
import TasksProvider from "./context/TasksProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SettingsProvider>
      <ThemeProvider>
        <TasksProvider>
          <App />
        </TasksProvider>
      </ThemeProvider>
    </SettingsProvider>
  </React.StrictMode>
);
