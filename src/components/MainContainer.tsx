import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import Dashboard from "./dashboard/Dashboard";
import Record from "./record/Record";
import Notes from "./notes/Notes";

function MainContainer({ location }: { location: any }) {
  return (
    <div className="app-container">
      <TransitionGroup className="app-container-tg">
        <CSSTransition
          key={location.key}
          timeout={{ enter: 500, exit: 500 }}
          classNames="fade"
        >
          <section className="app-container-rs">
            <Switch location={location}>
              <Route exact path="/" component={Dashboard} />
              <Route path="/record" component={Record} />
              <Route path="/notes" component={Notes} />
            </Switch>
          </section>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

export default withRouter(MainContainer);
