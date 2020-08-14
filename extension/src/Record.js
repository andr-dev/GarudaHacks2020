import React, { Component } from "react";
import { MouseEvent } from "react";

class Record extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      instructions: "first instructions",
      noteTextarea: "",
    };

    // const SR = window.SpeechRecognition;
    // console.log(SR);
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
    // this.instructions =
    //   "Press <strong>Start Recording</strong> and allow access to your microphone when prompted";
    this.notesList = (
      <ul id="notes">
        <li>
          <p className="no-notes">You don't have any notes.</p>
        </li>
      </ul>
    );

    var noteContent = "";

    this.recognition.continuous = true;

    this.recognition.onresult = function (event) {
      console.log("here wowzers");

      var current = event.resultIndex;

      var transcript = event.results[current][0].transcript;

      var mobileRepeatBug =
        current == 1 && transcript == event.results[0][0].transcript;

      console.log("got here");
      if (!mobileRepeatBug) {
        noteContent += transcript;
        console.log("setting state");
        console.log(this.noteContent);
        console.log(transcript);
        this.setState({ noteTextarea: this.state.noteTextarea + transcript });
      }
    }.bind(this);

    this.recognition.onstart = function () {
      this.setState({
        instructions:
          "Voice recognition activated. Try speaking into the microphone.",
      });
    }.bind(this);

    // this.recognition.onspeechend = function () {
    //   this.instructions.text(
    //     "You were quiet for a while so voice recognition turned itself off."
    //   );
    // };

    this.recognition.onerror = function (event) {
      console.log(event);
      if (event.error == "no-speech") {
        this.setState({ instructions: "No speech was detected. Try again." });
      } else {
        console.log(event);
        this.setState({ instructions: event });
      }
    }.bind(this);

    this.startRecording = this.startRecording.bind(this);
    this.pauseRecording = this.pauseRecording.bind(this);

    console.log(this.recognition);
  }

  render() {
    return (
      <div className="app-window">
        <h1>Record a note here</h1>

        <div className="app">
          <h3>Add New Note</h3>
          <div className="input-single">
            <textarea
              id="note-textarea"
              placeholder="Create a new note by typing or using voice recognition."
              rows={6}
              value={this.state.noteTextarea}
            ></textarea>
          </div>
          <button
            id="start-record-btn"
            title="Start Recording"
            onClick={this.startRecording}
          >
            Start Recording
          </button>
          <button
            id="pause-record-btn"
            title="Pause Recording"
            onClick={this.pauseRecording}
          >
            Stop Recording
          </button>
          <button
            id="save-note-btn"
            title="Save Note"
            onClick={this.saveNoteOnClick}
          >
            Save Note
          </button>
          <p id="recording-instructions">{this.state.instructions}</p>

          <h3>Saved Notes</h3>
          {this.notesList}
        </div>
      </div>
    );
  }

  startRecording() {
    console.log("starting recording");
    console.log(this.recognition);
    this.recognition.start();
  }

  pauseRecording() {
    console.log("pause recording");
  }

  saveNoteOnClick(event) {
    console.log("saving note");
  }
}

export default Record;
