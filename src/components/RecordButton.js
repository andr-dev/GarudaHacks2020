/*global chrome*/

import React from "react";
import { Button } from "semantic-ui-react";

import request from "request";
import JsSummarize from "../js/js-summarize.js";

import "./RecordButton.css";

class RecordButton extends React.Component {
  constructor() {
    super();
    this.recordText = ["Start Recording", "Recording in progress . . ."];
    this.summarizer = new JsSummarize();

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
      <Button fluid toggle onClick={this.recordOnClick}>
        {this.state.recordingButtonText}
      </Button>
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

    chrome.tabs.query(
      { active: true, currentWindow: true },
      function (tabs) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { get: "transcript" },
          function (response) {
            this.parseTranscript(response.answer);
          }.bind(this)
        );
      }.bind(this)
    );

    console.log("GarudaHacks2020: Stop Recording Message Sent!");
  }

  parseTranscript(transcript) {
    console.log("GarudaHacks2020: Original Transcript: ", transcript);

    var ft = transcript.toLowerCase();
    console.log(ft);
    ft.replace(/./g, " period");

    console.log("GarudaHacks2020: Cleaned Transcript: ", ft);

    this.sendTranscript(ft);
  }

  sendTranscript(transcript) {
    console.log("GarudaHacks2020: Sending Transcript: ", transcript);

    var options = {
      method: "POST",
      url:
        "https://proxy.api.deepaffects.com/text/generic/api/v1/async/punctuate",
      qs: {
        apikey: "JO0TUTyJSoBoJJfnCqlzZxWrKp7KF2y6",
        webhook: process.env.PIPEDREAM_WEBHOOK_URL,
      },
      headers: { "Content-Type": "application/json" },
      body: {
        texts: [transcript],
      },
      json: true,
    };
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      console.log(body);
    });
  }
  getSummary(transcript) {
    var summary = this.summarizer.summarize("Transcript #1", transcript);
    console.log("GarudaHacks2020: Summary:");
    for (var i = 0; i < summary.length; i++) {
      console.log(" - " + summary[i]);
    }
  }
}

export default RecordButton;
