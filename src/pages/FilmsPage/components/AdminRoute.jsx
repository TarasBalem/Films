import React from "react";
import {Route, Redirect} from "react-router-dom";
import _find from "lodash/find";
import {useUser} from "contexts/UserContext";

const AdminRoute = ({children, path, ...rest}) => {
  const [user] = useUser();
  const isAdmin = user.token && user.role === "admin";

  if (!isAdmin) {
    return <Redirect to="/films" />;
  }

  return (
    <Route
      path={path}
      render={({match}) => {
        const _id = match.params._id || null;
        return React.Children.map(children, child => {
          const film = _find(child.props.films, {_id}) || {};
          return React.cloneElement(child, {
            film,
            ...child.props,
          });
        });
      }}
      {...rest}
    />
  );
};

export default AdminRoute;
