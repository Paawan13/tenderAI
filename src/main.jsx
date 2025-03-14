import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import store from "./app/store.js";
import App from "./App.jsx";
import "./index.css";
import Login from "./components/Login.jsx";
import Proposal from "./components/Proposal.jsx";
import Register from "./components/Register.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/:id" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/proposal" element={<Proposal />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  </Provider>
);
