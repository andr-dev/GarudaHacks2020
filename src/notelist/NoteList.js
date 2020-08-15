/*global chrome*/

import React from "react";
import { Button, Icon, List, Grid } from "semantic-ui-react";

import NoteListItem from "./NoteListItem";
import "./NoteList.css";

import JsSummarize from "../js/js-summarize";

class NoteList extends React.Component {
  constructor() {
    super();
    this.state = {
      notes: [],
      loading: false,
    };

    this.summarizer = new JsSummarize();

    this.refreshNoteState();

    this.fetchWebHookAPI = this.fetchWebHookAPI.bind(this);
  }

  render() {
    var recordingCounter = 0;

    return (
      <div className="App-Window">
        <Grid>
          <Grid.Column width={8} className="notesTitle">
            <h3>Notes</h3>
          </Grid.Column>
          <Grid.Column width={8} floated="right">
            <Button icon floated="right" onClick={this.fetchWebHookAPI}>
              <Icon loading={this.state.loading} name="refresh"></Icon>
            </Button>
          </Grid.Column>
        </Grid>
        <div className="App-Window-Inner">
          <List divided verticalAlign="middle">
            {this.state.notes.map((note, index) => {
              recordingCounter++;
              return (
                <NoteListItem
                  title={note.title}
                  content={note.transcript.substring(0, 32) + "..."}
                  key={note.id}
                  id={note.id}
                  index={recordingCounter}
                />
              );
            })}
          </List>
        </div>
      </div>
    );
  }

  fetchWebHookAPI() {
    this.setState({
      loading: true,
    });

    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer fbdc49f688b320e0e15fd7c5cc0c76ce"
    );
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(
      "https://api.pipedream.com/v1/sources/dc_6RugBR/event_summaries?expand=event",
      requestOptions
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        var data = response.data;
        chrome.storage.sync.get(
          ["transcripts"],
          function (result) {
            if (result.hasOwnProperty("transcripts")) {
              var ts = result.transcripts;
              console.log(ts);
              for (var i = 0; i < ts.length; i++) {
                if (!ts[i].loaded) {
                  var newTs = data.find(
                    (x) => x.event.body.request_id == ts[i].id
                  );
                  console.log(newTs);
                  if (newTs !== undefined) {
                    console.log("found update for id [%s]", ts[i].id);
                    var tsTexts = newTs.event.body.response.punctuated_texts;
                    var tsText = "";
                    for (var j = 0; j < tsTexts.length; j++) {
                      tsText += tsTexts[j] + " ";
                    }
                    ts[i] = {
                      id: ts[i].id,
                      loaded: true,
                      title: ts[i].title,
                      transcript: tsText,
                      summary: this.getSummary(tsText),
                    };
                    console.log("new ts");
                    console.log(JSON.stringify(ts[i]));
                  }
                }
              }
              chrome.storage.sync.set(
                { transcripts: ts },
                function () {
                  console.log("Scribr: Finished Refresh");
                  this.setState({ loading: false });
                  this.refreshNoteState();
                }.bind(this)
              );
            }
          }.bind(this)
        );
      })
      .catch((error) => console.log("error", error));
  }

  refreshNoteState() {
    chrome.storage.sync.get(
      ["transcripts"],
      function (result) {
        var nt = [];
        if (result.hasOwnProperty("transcripts")) {
          console.log(result.transcripts);
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

  getSummary(transcript) {
    var summary = this.summarizer.summarize("Transcript #1", transcript);
    console.log("GarudaHacks2020: Summary:");
    for (var i = 0; i < summary.length; i++) {
      console.log(" - " + summary[i]);
    }
    return summary;
  }
}

export default NoteList;
