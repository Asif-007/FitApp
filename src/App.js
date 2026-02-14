import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./components/Home";
import NoMatch from "./components/NoMatch";
import Explore from "./components/Explore";
import Workout from "./components/Workout";
import NearGym from "./components/NearGym";
import Diet from "./components/Diet";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/Explore" element={<Explore></Explore>}></Route>
          <Route path="/NearGym" element={<NearGym></NearGym>}></Route>
          <Route path="/Workout" element={<Workout></Workout>}></Route>
          <Route path="/Diet" element={<Diet></Diet>}></Route>
          <Route path="/*" element={<NoMatch></NoMatch>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App></App>
  </StrictMode>,
);
