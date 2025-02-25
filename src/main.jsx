import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import store from "./app/store.js";
import App from "./App.jsx";
import "./index.css";
import Login from "./components/Login.jsx";
import Header from "./components/Header.jsx";
import Register from "./components/Register.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router>
      <Header />
      <Routes>
        {/* Redirect root path and any /:id to login */}
        {/* <Route path="/" element={<Navigate to="/register" replace />} /> */}
        <Route path="/" element={<App />} />
        <Route path="/:id" element={<App />} />
        {/* Login and Register routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  </Provider>
);
