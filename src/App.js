/*global chrome*/

import React from "react";
import logo from "./logo.svg";
import "./App.css";

import CustomButton from "./CustomButton";

import JsSummarize from "./js/js-summarize.js";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <CustomButton></CustomButton>
      </header>
    </div>
  );
}

export default App;

// The summarizer function
var summarizer = new JsSummarize();
var summary = summarizer.summarize(
  "Title",
  "A very small amount of water vapor enters the atmosphere through sublimation, the process by which water changes from a solid (ice or snow) to a gas, bypassing the liquid phase. This often happens in the Rocky Mountains as dry and warm Chinook winds blow in from the Pacific in late winter and early spring. When a Chinook takes effect local temperatures rise dramatically in a matter of hours. When the dry air hits the snow, it changes the snow directly into water vapor, bypassing the liquid phase."
);
console.log(summary);
