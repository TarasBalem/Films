import React, {Component, lazy, Suspense} from "react";
import {Route} from "react-router-dom";
import TopNavigation from "components/TopNavigation";
import HomePage from "pages/HomePage";
import Spinner from "components/Spinner";
import {setAuthorizationHeader} from "api";
import UserContext from "contexts/UserContrext";

const FilmsPage = lazy(() => import("pages/FilmsPage"));
const Film = lazy(() => import("pages/FilmsPage/components/Film"));
const SignupPage = lazy(() => import("pages/SignupPage"));
const LoginPage = lazy(() => import("pages/LoginPage"));

const initUser = {
  token: null,
  role: "user",
};

class App extends Component {
  state = {
    user: initUser,
    message: "",
  };

  componentDidMount() {
    if (localStorage.filmsToken) {
      this.setState({user: {token: localStorage.filmsToken}});
      setAuthorizationHeader(localStorage.filmsToken);
    }
  }

  login = token => {
    this.setState({user: {token, role: "user"}});
    localStorage.filmsToken = token;
    setAuthorizationHeader(token);
  };

  logout = () => {
    this.setState({user: {token: null, role: ""}});
    setAuthorizationHeader();
    delete localStorage.filmsToken;
  };

  setMessage = message => this.setState({message});

  render() {
    const {user, message} = this.state;
    return (
      <Suspense fallback={<Spinner />}>
        <div className="ui container mt-3">
          <TopNavigation
            logout={this.logout}
            isAuth={!!user.token}
            isAdmin={!!user.token && user.role === "admin"}
          />
          {message && (
            <div className="ui info message">
              <i className="close icon" onClick={() => this.setMessage("")} />
              {message}
            </div>
          )}

          <Route exact path="/">
            <HomePage />
          </Route>
          <UserContext.Provider value={{user}}>
            <Route path="/films">
              <FilmsPage />
            </Route>
          </UserContext.Provider>
          <Route path="/film/:id">
            <Film />
          </Route>
          <Route path="/signup">
            <SignupPage setMessage={this.setMessage} />
          </Route>
          <Route path="/login">
            <LoginPage login={this.login} />
          </Route>
        </div>
      </Suspense>
    );
  }
}

export default App;
