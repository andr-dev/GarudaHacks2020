/*global chrome*/

import React from "react";
import { Button, Image, List } from "semantic-ui-react";

import NoteListItem from "./NoteListItem";
import "./NoteList.css";

class NoteList extends React.Component {
  constructor() {
    super();
    this.state = {
      notes: [],
    };

    chrome.storage.sync.get(
      ["transcripts"],
      function (result) {
        var nt = [];
        if (result.hasOwnProperty("transcripts")) {
          for (var i = 0; i < result.transcripts.length; i++) {
            nt.push(result.transcripts[i]);
          }
        }
        this.setState({
          notes: nt,
        });
      }.bind(this)
    );
  }

  render() {
    return (
      <div className="App-Window">
        <div className="noteList-Inner">
          <h3>Notes</h3>
          <List divided verticalAlign="middle">
            {this.state.notes.map((note, index) => {
              console.log("note:");
              console.log(note);
              return (
                <NoteListItem
                  title={note.title}
                  content={note.transcript}
                  key={note.id}
                />
              );
            })}
          </List>
        </div>
      </div>
    );
  }
}

export default NoteList;

// var notes = [
//   {
//     id: "189uiewdjkh98u31oq",
//     title: "This is my title",
//     transcript: "This is the trnascript ",
//     summary: [
//       {
//         0: "s1",
//         1: "s2",
//         2: "s3",
//         3: "s4",
//       },
//     ],
//   },
//   {
//     id: "189uiewd1oq",
//     title: "This is my title",
//     transcript: "This is the trnascript ",
//     summary: [
//       {
//         0: "s1",
//         1: "s2",
//         2: "s3",
//         3: "s4",
//       },
//     ],
//   },
// ];
