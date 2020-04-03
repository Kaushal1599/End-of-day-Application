import React, { useContext } from "react";
import Authcontext from "../auth/Authcontext";
import { Route, Redirect } from "react-router-dom";
export const PrivateEx = ({ component: Component, ...rest }) => {
  const authContext = useContext(Authcontext);
  const { isAuthenticated, isExecutive } = authContext;

  return (
    <Route
      {...rest}
      render={props =>
        !isAuthenticated && !isExecutive ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};
export default PrivateEx;
