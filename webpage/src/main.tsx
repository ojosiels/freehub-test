import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { ClientProvider } from "./contexts/ClientContext.tsx";
import { UserProvider } from "./contexts/UserContext.tsx";

import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ClientProvider>
          <App />
        </ClientProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
