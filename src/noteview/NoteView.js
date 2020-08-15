/*global chrome*/

import React from "react";
import SummaryPoint from "./SummaryPoint";

class NoteView extends React.Component {
  constructor() {
    super();
    this.state = {
      note: {
        id: "",
        loaded: false,
        title: "",
        transcript: "",
        summary: [],
      },
      loaded: false,
    };
  }

  render() {
    if (!this.state.loaded) {
      var params = this.props.match.params;
      console.log("Getting note with param id: " + params.id);

      chrome.storage.sync.get(
        ["transcripts"],
        function (result) {
          if (result.hasOwnProperty("transcripts")) {
            console.log(result.transcripts);
            var nt = result.transcripts.find((x) => x.id == params.id);
            console.log(nt);
            if (nt !== undefined) {
              this.setState({
                note: nt,
              });
            } else {
              this.setState({
                note: {
                  id: "unknown",
                  title: "Could not find note",
                  transcript:
                    "Sorry, the note you requested could not be found. Please go back and try again.",
                  summary: [],
                },
              });
            }
          } else {
            console.log(
              "Scribr: Error: Could not find property 'transcripts' in db!"
            );
          }
          this.setState({
            loaded: true,
          });
        }.bind(this)
      );
    }

    return (
      <div className="App-Window">
        <div className="App-Window-Inner">
          <div className="ui fluid card">
            <div className="content">
              <div className="header">{this.state.note.title}</div>
            </div>
            <div className="content">
              <h4 className="ui sub header">Transcript</h4>
              <div class="event">
                <div class="content">
                  <div class="summary">{this.state.note.transcript}</div>
                </div>
              </div>
              <h4 className="ui sub header">Summary</h4>
              {this.state.note.summary.map((point) => {
                return <SummaryPoint point={point} />;
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NoteView;
