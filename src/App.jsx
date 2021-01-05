import React, {Component, lazy, Suspense} from "react";
import {Switch, Route} from "react-router-dom";
import TopNavigation from "components/TopNavigation";
import HomePage from "pages/HomePage";
import Spinner from "components/Spinner";

const FilmsPage = lazy(() => import("pages/FilmsPage"));
const SignupPage = lazy(() => import("pages/SignupPage"));
const LoginPage = lazy(() => import("pages/LoginPage"));
const Film = lazy(() => import("pages/FilmsPage/components/Film"));

const initUser = {
  token: null,
  role: "user",
};

class App extends Component {
  state = {
    user: initUser,
  };

  logout = () => this.setState({user: {token: null}});

  render() {
    const user = this.state;
    return (
      <Suspense fallback={Spinner}>
        <div className="ui container mt-3">
          <TopNavigation logout={this.logout} isAuth={!!user.token} />
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
            <Route path="/signup">
              <SignupPage />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
          </Switch>
        </div>
      </Suspense>
    );
  }
}

export default App;
