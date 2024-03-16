import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);

window.addEventListener("blur", () => {
    document.title = "We miss you...";
});

window.addEventListener("focus", () => {
    document.title = "Lets Disco";
});
