import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import AppProvider from "./Context/Firebase.jsx"
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import App from "./App.jsx"

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
        <AppProvider>
            {/* <ReactMarkdown rehypePlugins={[rehypeRaw]} > */}
            <App />
            {/* </ReactMarkdown> */}
        </AppProvider>
        </BrowserRouter>
    </StrictMode>
)