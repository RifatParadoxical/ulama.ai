import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import AppProvider from "./Context/Firebase.jsx"
import App from "./App.jsx"

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
        <AppProvider>
            <App />
        </AppProvider>
        </BrowserRouter>
    </StrictMode>
)