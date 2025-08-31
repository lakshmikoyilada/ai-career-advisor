import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home.js";
import Test from "./pages/test.js";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/test" element={<Test />} />
    </Routes>
  );
}

export default App;
