import React, {Component} from "react";
import {Switch, Route} from "react-router-dom";
import TopNavigation from "components/TopNavigation";
import HomePage from "pages/HomePage";
import FilmsPage from "pages/FilmsPage";
import Film from "pages/FilmsPage/components/Film";

class App extends Component {
  render() {
    return (
      <div className="ui container mt-3">
        <TopNavigation />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/films">
            <FilmsPage />
          </Route>
          <Route path="/film/:id">
            <Film />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
