import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
// import { BrowserRouter } from "react-router-dom";
{
  /* Store */
}
import { Provider } from "react-redux";
import { store } from "./store/index.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    {/* <BrowserRouter>
    </BrowserRouter> */}
    <App />
  </Provider>
);
