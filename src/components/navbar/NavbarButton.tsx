import React from "react";
import { Link } from "react-router-dom";

import "./NavbarButton.css";
import Navbar from "./Navbar";

class NavbarButton extends React.Component<{ name: string; link: string }, {}> {
  render() {
    return (
      <Link to={this.props.link}>
        <div className="app-navbar-button">
          <p>{this.props.name}</p>
        </div>
      </Link>
    );
  }
}

export default NavbarButton;
