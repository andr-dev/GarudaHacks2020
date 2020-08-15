/*global chrome*/

import React from "react";
import { Button, Grid, Checkbox, Icon } from "semantic-ui-react";
import { Slider } from "react-semantic-ui-range";

import CustomButton from "./RecordButton";

import "./Dashboard.css";

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      startRecordingAutomatically: false,
      generateSummaryAfterRecording: false,
      serviceMicrosoftTeams: false,
      serviceGoogleHangouts: false,
      inputVolume: 1,
      inputMic: false,
    };

    chrome.storage.sync.get(
      ["settings"],
      function (result) {
        console.log("Scibr: DB result:");
        console.log(result);
        if (result.hasOwnProperty("settings")) {
          this.setState({
            startRecordingAutomatically:
              result.settings.startRecordingAutomatically,
            generateSummaryAfterRecording:
              result.settings.generateSummaryAfterRecording,
            serviceMicrosoftTeams: result.settings.serviceMicrosoftTeams,
            serviceGoogleHangouts: result.settings.serviceGoogleHangouts,
            inputVolume: result.settings.inputVolume,
            inputMic: result.settings.inputMic,
          });
        }
      }.bind(this)
    );

    this.inputSliderSettings = {
      start: this.state.inputVolume,
      min: 0,
      max: 15,
      step: 1,
      onChange: (value) => {
        this.setState({
          inputVolume: value,
        });
        this.storeToDB("inputVolume", value);
      },
    };
    this.startRecordingAutomaticallyToggle = this.startRecordingAutomaticallyToggle.bind(
      this
    );
    this.generateSummaryAfterRecordingToggle = this.generateSummaryAfterRecordingToggle.bind(
      this
    );
    this.serviceMicrosoftTeamsToggle = this.serviceMicrosoftTeamsToggle.bind(
      this
    );
    this.serviceGoogleHangoutsToggle = this.serviceGoogleHangoutsToggle.bind(
      this
    );
    this.switchInputMicState = this.switchInputMicState.bind(this);
  }

  render() {
    return (
      <div className="App-Window">
        <Grid divided="vertically">
          <Grid.Row>
            <Grid.Column width={16}>
              <h3>Settings</h3>
            </Grid.Column>
            <Grid.Column width={12}>Start Recording Automatically</Grid.Column>
            <Grid.Column width={4}>
              <Checkbox
                toggle
                checked={this.state.startRecordingAutomatically}
                onChange={this.startRecordingAutomaticallyToggle}
              />
            </Grid.Column>
            <Grid.Column width={12}>
              Generate Summary After Recording
            </Grid.Column>
            <Grid.Column width={4}>
              <Checkbox
                toggle
                checked={this.state.generateSummaryAfterRecording}
                onChange={this.generateSummaryAfterRecordingToggle}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              <h3>Services</h3>
            </Grid.Column>
            <Grid.Column width={12}>Microsoft Teams</Grid.Column>
            <Grid.Column width={4}>
              <Checkbox
                toggle
                checked={this.state.serviceMicrosoftTeams}
                onChange={this.serviceMicrosoftTeamsToggle}
              />
            </Grid.Column>
            <Grid.Column width={12}>Google Hangouts</Grid.Column>
            <Grid.Column width={4}>
              <Checkbox
                toggle
                checked={this.state.serviceGoogleHangouts}
                onChange={this.serviceGoogleHangoutsToggle}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              <h3>Audio Settings</h3>
            </Grid.Column>
            <Grid.Column width={8}>Input Volume</Grid.Column>
            <Grid.Column width={8} className="slider">
              <Slider
                discrete
                color="blue"
                value={this.state.inputVolume}
                settings={this.inputSliderSettings}
              />
            </Grid.Column>
            <Grid.Column width={4} className="col-tight col-left">
              Input Devices
            </Grid.Column>
            <Grid.Column
              textAlign="center"
              width={6}
              className="col-tight col-left col-right"
            >
              <Button icon fluid disabled className="settingsButton flexed">
                <Icon name="volume up" />
                <h5>System Audio</h5>
              </Button>
            </Grid.Column>
            <Grid.Column
              textAlign="center"
              width={6}
              className="col-tight col-right"
            >
              <Button
                icon
                fluid
                toggle
                active={this.state.inputMic}
                className="settingsButton flexed"
                onClick={this.switchInputMicState}
              >
                <Icon name="microphone" />
                <h5>Microphone</h5>
              </Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              <h3>Manual Record</h3>
            </Grid.Column>
            <Grid.Column width={16}>
              <CustomButton />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }

  switchInputMicState(event, component) {
    this.storeToDB("inputMic", !this.state.inputMic);
    this.setState({ inputMic: !this.state.inputMic });
  }

  startRecordingAutomaticallyToggle(event, component) {
    this.storeToDB(
      "startRecordingAutomatically",
      !this.state.startRecordingAutomatically
    );
    this.setState({
      startRecordingAutomatically: !this.state.startRecordingAutomatically,
    });
  }

  generateSummaryAfterRecordingToggle(event, component) {
    this.storeToDB(
      "generateSummaryAfterRecording",
      !this.state.generateSummaryAfterRecording
    );
    this.setState({
      generateSummaryAfterRecording: !this.state.generateSummaryAfterRecording,
    });
  }

  serviceMicrosoftTeamsToggle(event, component) {
    this.storeToDB("serviceMicrosoftTeams", !this.state.serviceMicrosoftTeams);
    this.setState({ serviceMicrosoftTeams: !this.state.serviceMicrosoftTeams });
  }

  serviceGoogleHangoutsToggle(event, component) {
    this.storeToDB("serviceGoogleHangouts", !this.state.serviceGoogleHangouts);
    this.setState({ serviceGoogleHangouts: !this.state.serviceGoogleHangouts });
  }

  storeToDB(key, value) {
    chrome.storage.sync.get(["settings"], function (result) {
      var st = result.settings;
      st[key] = value;
      chrome.storage.sync.set({ settings: st }, function () {
        console.log("Set [%s] to [%s]", key, value);
      });
    });
  }

  switchInputMicState(event, component) {
    this.storeToDB("inputMic", !this.state.inputMic);
    this.setState({ inputMic: !this.state.inputMic });
  }

  startRecordingAutomaticallyToggle(event, component) {
    this.storeToDB(
      "startRecordingAutomatically",
      !this.state.startRecordingAutomatically
    );
    this.setState({
      startRecordingAutomatically: !this.state.startRecordingAutomatically,
    });
  }

  generateSummaryAfterRecordingToggle(event, component) {
    this.storeToDB(
      "generateSummaryAfterRecording",
      !this.state.generateSummaryAfterRecording
    );
    this.setState({
      generateSummaryAfterRecording: !this.state.generateSummaryAfterRecording,
    });
  }

  serviceMicrosoftTeamsToggle(event, component) {
    this.storeToDB("serviceMicrosoftTeams", !this.state.serviceMicrosoftTeams);
    this.setState({ serviceMicrosoftTeams: !this.state.serviceMicrosoftTeams });
  }

  serviceGoogleHangoutsToggle(event, component) {
    this.storeToDB("serviceGoogleHangouts", !this.state.serviceGoogleHangouts);
    this.setState({ serviceGoogleHangouts: !this.state.serviceGoogleHangouts });
  }

  storeToDB(key, value) {
    chrome.storage.sync.get(["settings"], function (result) {
      var st = result.settings;
      st[key] = value;
      chrome.storage.sync.set({ settings: st }, function () {
        console.log("Set [%s] to [%s]", key, value);
      });
    });
  }
}

export default Dashboard;
