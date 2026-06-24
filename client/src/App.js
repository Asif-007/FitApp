import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./components/Home";
import NoMatch from "./components/NoMatch";
import Explore from "./components/Explore";
import Workout from "./components/Workout";
import NearGym from "./components/NearGym";
import Diet from "./components/Diet";
import Login from "./components/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"        element={<Home />} />
        <Route path="/Explore" element={<Explore />} />
        <Route path="/NearGym" element={<NearGym />} />
        <Route path="/Workout" element={<Workout />} />
        <Route path="/Diet"    element={<Diet />} />
        <Route path="/login"   element={<Login />} />
        <Route path="/*"       element={<NoMatch />} />
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);