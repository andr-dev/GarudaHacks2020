import React from "react";
import { Button, Image, List } from "semantic-ui-react";

import NoteListItem from "./NoteListItem";
import "./NoteList.css";

export default function NoteList() {
  var notes = [
    {
      id: "189uiewdjkh98u31oq",
      title: "This is my title",
      transcript: "This is the trnascript ",
      summary: [
        {
          0: "s1",
          1: "s2",
          2: "s3",
          3: "s4",
        },
      ],
    },
    {
      id: "189uiewd1oq",
      title: "This is my title",
      transcript: "This is the trnascript ",
      summary: [
        {
          0: "s1",
          1: "s2",
          2: "s3",
          3: "s4",
        },
      ],
    },
  ];

  return (
    <div className="App-Window">
      <List divided verticalAlign="middle">
        {notes.map((note, index) => {
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
  );
}
