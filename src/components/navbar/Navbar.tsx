import React from "react";

import "./Navbar.css";

import NavbarButton from "./NavbarButton";

class Navbar extends React.Component {
  render() {
    return (
      <div className="app-navbar">
        <NavbarButton name="Dashboard" link="/"></NavbarButton>
        <NavbarButton name="Record" link="/record"></NavbarButton>
        <NavbarButton name="Notes" link="/notes"></NavbarButton>
      </div>
    );
  }
}

export default Navbar;
