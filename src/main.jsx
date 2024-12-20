import React from "react";
import ReactDOM from "react-dom/client";
import { DarkThemeProvider } from "./contexts/DarkThemeContext.jsx";
import { PriorityProvider } from "./contexts/PriorityContext.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import { TimeProvider } from "./contexts/TimeContext.jsx";
import { TodosProvider } from "./contexts/TodoContext.jsx";
import App from "./App.jsx";
import "./css/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PriorityProvider>
      <DarkThemeProvider>
        <TodosProvider>
          <ThemeProvider>
            <TimeProvider>
              <App /> 
            </TimeProvider>
          </ThemeProvider>
        </TodosProvider>
      </DarkThemeProvider>
    </PriorityProvider>
  </React.StrictMode>
);
