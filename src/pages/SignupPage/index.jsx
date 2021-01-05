import React from "react";
import PropTypes from "prop-types";
import {useHistory} from "react-router-dom";
import SignupForm from "pages/SignupPage/components/SignupForm";
import api from "api";

const SignupPage = ({setMessage}) => {
  const history = useHistory();

  const submit = user =>
    api.users.create(user).then(() => {
      setMessage("User has created");
      history.push("/login");
    });

  return (
    <div className="ui grid">
      <div className="eight wide column">
        <SignupForm submit={submit} />
      </div>
    </div>
  );
};

SignupPage.propTypes = {
  setMessage: PropTypes.func.isRequired,
};

export default SignupPage;
