import React from "react";

import "./RecordButton.css";

import Microphone from "../assets/images/microphone.png";

class RecordButton extends React.Component {
  render() {
    return (
      <div>
        <button onClick={this.activateRecording}>
          <img src={Microphone} />
        </button>
      </div>
    );
  }

  activateRecording() {
    console.log("hello");
  }
}

export default RecordButton;
