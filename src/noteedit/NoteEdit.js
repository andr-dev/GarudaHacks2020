/*global chrome*/

import React from "react";
import { withRouter } from "react-router-dom";
import { Button, Form, Input, TextArea } from "semantic-ui-react";

class NoteEdit extends React.Component {
  constructor() {
    super();

    this.state = {
      id: "",
      loaded: false,
      title: "",
      transcript: "",
      summary: [],
      ready: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
    this.buttonSave = this.buttonSave.bind(this);
    this.buttonDelete = this.buttonDelete.bind(this);
  }

  render() {
    if (!this.state.ready) {
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
                id: nt.id,
                loaded: nt.loaded,
                title: nt.title,
                transcript: nt.transcript,
                summary: nt.summary,
              });
            } else {
              this.setState({
                id: "unknown",
                title: "Could not find note",
                transcript:
                  "Sorry, the note you requested could not be found. Please go back and try again.",
                summary: [],
              });
            }
          } else {
            console.log(
              "Scribr: Error: Could not find property 'transcripts' in db!"
            );
          }
          this.setState({
            ready: true,
          });
        }.bind(this)
      );
    }

    return (
      <div className="App-Window">
        <div className="App-Window-Inner">
          <Form onSubmit={this.formSubmit}>
            <Form.Field
              control={Input}
              name="title"
              label="Title"
              value={this.state.title}
              onChange={this.handleChange}
            />
            <Form.Field
              control={TextArea}
              label="Transcript"
              name="transcript"
              value={this.state.transcript}
              onChange={this.handleChange}
            />
            <Form.Field
              control={TextArea}
              name="summary"
              label="Summary"
              value={this.state.summary}
              onChange={this.handleChange}
            />
            <Form.Group inline widths="equal">
              <Form.Field
                fluid
                positive
                control={Button}
                onClick={this.buttonSave}
                className="noPadding"
              >
                Save Changes
              </Form.Field>
              <Form.Field
                fluid
                negative
                control={Button}
                onClick={this.buttonDelete}
                className="noPadding"
              >
                Delete Note
              </Form.Field>
            </Form.Group>
          </Form>
        </div>
      </div>
    );
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  formSubmit() {
    console.log("form submit");
  }

  buttonSave() {
    console.log("form save");
    console.log(this.state);
    chrome.storage.sync.get(
      ["transcripts"],
      function (result) {
        if (result.hasOwnProperty("transcripts")) {
          var ts = result.transcripts;
          console.log(ts);
          for (var i = 0; i < ts.length; i++) {
            if (ts[i].id == this.state.id) {
              ts[i] = {
                id: this.state.id,
                loaded: this.state.loaded,
                title: this.state.title,
                transcript: this.state.transcript,
                summary: this.state.summary,
              };
              break;
            }
          }
          console.log(ts);
          chrome.storage.sync.set(
            { transcripts: ts },
            function () {
              console.log("Scribr: Finished Saving");
              this.props.history.push("/notelist");
            }.bind(this)
          );
        }
      }.bind(this)
    );
  }

  buttonDelete() {
    console.log("form delete");
    console.log(this.state);
    chrome.storage.sync.get(
      ["transcripts"],
      function (result) {
        if (result.hasOwnProperty("transcripts")) {
          var ts = result.transcripts;
          console.log(ts);
          for (var i = 0; i < ts.length; i++) {
            if (ts[i].id == this.state.id) {
              console.log("deleting:");
              console.log(ts[i]);
              ts.splice(i, 1);
              break;
            }
          }
          console.log(ts);
          chrome.storage.sync.set(
            { transcripts: ts },
            function () {
              console.log("Scribr: Finished Deleting");
              this.props.history.push("/notelist");
            }.bind(this)
          );
        }
      }.bind(this)
    );
  }
}

export default withRouter(NoteEdit);
