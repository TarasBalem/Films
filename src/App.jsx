import React, {useState, lazy, Suspense} from "react";
import {Route} from "react-router-dom";
import TopNavigation from "components/TopNavigation";
import HomePage from "pages/HomePage";
import Spinner from "components/Spinner";
import {useUser} from "contexts/UserContext";

const FilmsPage = lazy(() => import("pages/FilmsPage"));
const Film = lazy(() => import("pages/FilmsPage/components/Film"));
const SignupPage = lazy(() => import("pages/SignupPage"));
const LoginPage = lazy(() => import("pages/LoginPage"));

const App = () => {
  const [message, setMessage] = useState("");
  const [user] = useUser();

  return (
    <Suspense fallback={<Spinner />}>
      <div className="ui container mt-3">
        <TopNavigation />
        {message && (
          <div className="ui info message">
            <i className="close icon" onClick={() => setMessage("")} />
            {message}
          </div>
        )}

        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/films">
          <FilmsPage user={user} />
        </Route>
        <Route path="/film/:id">
          <Film />
        </Route>
        <Route path="/signup">
          <SignupPage setMessage={setMessage} />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
      </div>
    </Suspense>
  );
};

export default App;
