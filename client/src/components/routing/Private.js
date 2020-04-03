import React, { useContext } from "react";
import Authcontext from "../auth/Authcontext";
import { Route, Redirect } from "react-router-dom";
export const Private = ({ component: Component, ...rest }) => {
  const authContext = useContext(Authcontext);
  const { isAuthenticated } = authContext;

  return (
    <Route
      {...rest}
      render={props =>
        !isAuthenticated ? <Redirect to="/login" /> : <Component {...props} />
      }
    />
  );
};
export default Private;
