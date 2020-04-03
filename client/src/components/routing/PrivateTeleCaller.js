import React, { useContext } from "react";
import Authcontext from "../auth/Authcontext";
import { Route, Redirect } from "react-router-dom";
export const PrivateTeleCaller = ({ component: Component, ...rest }) => {
  const authContext = useContext(Authcontext);
  const { isAuthenticated, isTelecaller } = authContext;

  return (
    <Route
      {...rest}
      render={props =>
        !isAuthenticated && !isTelecaller ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};
export default PrivateTeleCaller;
