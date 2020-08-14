import React from "react";

import "./Notes.css";

class Notes extends React.Component {
  constructor() {
    super({}, {});
  }

  render() {
    return (
      <div className="app-window">
        <p>
          this is the notes page. here, you should be able to see a listview of
          everything :)
        </p>
      </div>
    );
  }
}

export default Notes;
