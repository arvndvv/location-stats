import React from "react";
import { Route } from "react-router";
import { Routes } from "react-router-dom";
import "./App.scss";
import History from "./pages/history/history";
import Home from "./pages/home/home";
import NotFound from "./pages/not-found/not-found";
import { StateProvider } from "./store/store";

function App() {
  return (
    <StateProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/location" element={<Home />} />
        <Route path="/history" element={<History />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </StateProvider>
  );
}

export default App;
