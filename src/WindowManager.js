import React from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import Dashboard from "./dashboard/Dashboard";
import NoteList from "./notelist/NoteList";
import NoteView from "./noteview/NoteView";
import NoteEdit from "./noteedit/NoteEdit";

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
              <Route exact path="/" component={Dashboard} />
              <Route path="/notelist" component={NoteList} />
              <Route
                path="/noteview/:id"
                render={(props) => <NoteView {...props} />}
              />
              <Route
                path="/noteedit/:id"
                render={(props) => <NoteEdit {...props} />}
              />
              <Route path="/index.html">
                <Redirect to="/" />
              </Route>
            </Switch>
          </section>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

export default withRouter(WindowManager);
