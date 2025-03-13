import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import store from "./app/store.js";
import App from "./App.jsx";
import "./index.css";
import Login from "./components/Login.jsx";
<<<<<<< HEAD
import Header from "./components/Header.jsx";
=======
import Proposal from "./components/Proposal.jsx";
//import Header from "./components/Header.jsx";
>>>>>>> 25c469c (updated frontend)
import Register from "./components/Register.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router>
<<<<<<< HEAD
      <Header />
=======
      {/*<Header /> */}
>>>>>>> 25c469c (updated frontend)
      <Routes>
        {/* Redirect root path and any /:id to login */}
        {/* <Route path="/" element={<Navigate to="/register" replace />} /> */}
        <Route path="/" element={<App />} />
        <Route path="/:id" element={<App />} />
        {/* Login and Register routes */}
        <Route path="/login" element={<Login />} />
<<<<<<< HEAD
=======
        <Route path="/proposal" element={<Proposal />} />
>>>>>>> 25c469c (updated frontend)
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  </Provider>
);
