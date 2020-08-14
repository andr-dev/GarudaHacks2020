/*global chrome*/

import React from "react";

class CustomButton extends React.Component {
  constructor() {
    super();
    this.recordText = ["Start", "Recording"];

    this.state = {
      recordingState: false,
      recordingButtonText: this.recordText[0],
    };

    chrome.tabs.query(
      { active: true, currentWindow: true },
      function (tabs) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { get: "isRecording" },
          function (response) {
            if (response.answer) {
              this.setState({
                recordingState: true,
                recordingButtonText: this.recordText[1],
              });
            } else {
              this.setState({
                recordingState: false,
                recordingButtonText: this.recordText[0],
              });
            }
          }.bind(this)
        );
      }.bind(this)
    );

    this.recordOnClick = this.recordOnClick.bind(this);
    this.startRecording = this.startRecording.bind(this);
    this.stopRecording = this.stopRecording.bind(this);
  }

  render() {
    return (
      <div>
        <button onClick={this.recordOnClick}>
          {this.state.recordingButtonText}
        </button>
      </div>
    );
  }

  recordOnClick() {
    if (this.state.recordingState) {
      this.stopRecording();
    } else {
      this.startRecording();
    }

    this.setState({
      recordingState: !this.state.recordingState,
      recordingButtonText: this.recordText[this.state.recordingState ? 0 : 1],
    });
  }

  startRecording() {
    console.log("GarudaHacks2020: Sending Start Recording Message . . .");

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { post: "startRecording" }, null);
    });

    console.log("GarudaHacks2020: Start Recording Message Sent!");
  }

  stopRecording() {
    console.log("GarudaHacks2020: Sending Stop Recording Message . . .");

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { post: "stopRecording" }, null);
    });

    console.log("GarudaHacks2020: Stop Recording Message Sent!");
  }
}

export default CustomButton;
