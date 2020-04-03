import React, { useState, useContext, useEffect } from "react";
import Authcontext from "../../components/auth/Authcontext";
import Alertcontext from "../../components/Alert/Alertcontext";
const Login = props => {
  const alertcontext = useContext(Alertcontext);
  const authcontext = useContext(Authcontext);
  const { login, isAuthenticated, error, clearError } = authcontext;

  useEffect(() => {
    if (error === "Invalid  User Name") {
      alertcontext.setAlert(error, "danger");
      clearError();
    } else if (error === "Invalid Password") {
      alertcontext.setAlert(error, "danger");
      clearError();
    } else {
      if (isAuthenticated) {
        props.history.push("/");
        alertcontext.setAlert("Logged in", "success");
      }
    }

    // eslint-disable-next-line
  }, [isAuthenticated, props.history, error]);

  const [user, setUser] = useState({
    emp_id: "",
    password: ""
  });
  const { emp_id, password } = user;

  const onChange = e =>
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });

  const onSubmit = e => {
    e.preventDefault();
    login({
      emp_id,
      password
    });
  };

  return (
    <div className="container">
      <div className="jumbotron">
        <div className="container">
          <h2>
            <strong>EOD APPLICATION </strong>
          </h2>
        </div>
        <h1>
          <strong>
            Account <span className="text-primary">Login </span>
          </strong>
        </h1>
        <form className="form-group" onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="emp_id">Employee ID </label>
            <input
              className="form-control"
              type="text"
              name="emp_id"
              value={emp_id}
              onChange={onChange}
              required
              placeholder="Enter Employee ID"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password </label>
            <input
              className="form-control"
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              required
            />
          </div>

          <input type="submit" value="Login" className="btn btn-primary" />
        </form>
      </div>
    </div>
  );
};

export default Login;
