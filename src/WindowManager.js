import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import NoteList from "./components/NoteList";
import Dashboard from "./components/Dashboard";

function WindowManager({ location }) {
  return (
    <div className="App-Wrapper">
      <TransitionGroup className="App-Wrapper-TG">
        <CSSTransition
          key={location.key}
          timeout={{ enter: 250, exit: 250 }}
          classNames="fade"
        >
          <section className="App-Wrapper-RS">
            <Switch location={location}>
              <Route exact path="/notelist" component={NoteList} />
              <Route exact path="/" component={Dashboard}></Route>
            </Switch>
          </section>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

export default withRouter(WindowManager);
