import React from "react";

import "./Record.css";

import "./RecordButton";
import RecordButton from "./RecordButton";

class Record extends React.Component {
  render() {
    return (
      <div className="app-window">
        <p>
          this is the recording page. here, you should be able to start a
          recording
        </p>
        <RecordButton></RecordButton>
      </div>
    );
  }
}

export default Record;
