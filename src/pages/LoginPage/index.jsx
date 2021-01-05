import React from "react";
import PropTypes from "prop-types";
import {useHistory} from "react-router-dom";
import LoginForm from "pages/LoginPage/components/LoginForm";
import api from "api";

const LoginPage = ({login}) => {
  const history = useHistory();
  const submit = user =>
    api.users.login(user).then(token => {
      login(token);
      history.push("/films");
    });

  return (
    <div className="ui grid">
      <div className="eight wide column">
        <LoginForm submit={submit} />
      </div>
    </div>
  );
};

LoginPage.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginPage;
