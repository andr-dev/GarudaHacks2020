/*global chrome*/

import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";
import "./variables.css";
import "semantic-ui-css/semantic.min.css";
import "./semantic-override.css";

import Navbar from "./Navbar";
import WindowManager from "./WindowManager";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <WindowManager />
      </div>
    </Router>
  );
}

export default App;
