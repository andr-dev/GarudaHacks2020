import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import logo from "./logo.svg";

import "./App.css";
import "./variables.css";
import "./colors.css";

import Navbar from "./components/navbar/Navbar";
import MainContainer from "./components/MainContainer";

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <MainContainer />
      </div>
    </Router>
  );
}

export default App;
