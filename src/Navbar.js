import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "semantic-ui-react";

import "./Navbar.css";

import logo from "./assets/logo.png";

class Navbar extends React.Component {
  render() {
    return (
      <div className="App-Navbar">
        <div className="App-Navbar-Container">
          <img id="App-Navbar-Logo" src={logo}></img>
          <p id="App-Navbar-Title">Scribr</p>
          <div className="App-Navbar-Links">
            <Link to="/">
              <Icon circular name="setting" />
            </Link>
            <Link to="/notelist">
              <Icon circular name="book" />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;
