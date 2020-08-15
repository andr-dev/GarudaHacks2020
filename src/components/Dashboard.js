import React from "react";
import { Button, Grid, Image, Checkbox, Icon } from "semantic-ui-react";
import { Slider } from "react-semantic-ui-range";

import "./Dashboard.css";

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      inputVolume: 1,
      inputMic: false,
    };

    this.inputSliderSettings = {
      start: 11,
      min: 0,
      max: 15,
      step: 1,
      onChange: (value) => {
        this.setState({
          inputVolume: value,
        });
      },
    };

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
              <Checkbox toggle />
            </Grid.Column>
            <Grid.Column width={12}>
              Generate Summary After Recording
            </Grid.Column>
            <Grid.Column width={4}>
              <Checkbox toggle />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              <h3>Services</h3>
            </Grid.Column>
            <Grid.Column width={12}>Microsoft Teams</Grid.Column>
            <Grid.Column width={4}>
              <Checkbox toggle />
            </Grid.Column>
            <Grid.Column width={12}>Google Hangouts</Grid.Column>
            <Grid.Column width={4}>
              <Checkbox toggle />
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
                settings={this.inputSliderSettings}
              />
            </Grid.Column>
            <Grid.Column width={4}>Input Devices</Grid.Column>
            <Grid.Column textAlign="center" width={6}>
              <Button icon fluid disabled className="settingsButton flexed">
                <Icon name="volume up" />
                <h5>System Audio</h5>
              </Button>
            </Grid.Column>
            <Grid.Column textAlign="center" width={6}>
              <Button
                icon
                fluid
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
          </Grid.Row>
        </Grid>
      </div>
    );
  }

  switchInputMicState(event, component) {
    this.setState({ inputMic: !this.state.inputMic });
  }
}

export default Dashboard;
