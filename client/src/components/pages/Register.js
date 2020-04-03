import React, { useState, useContext, useEffect } from "react";
import Authcontext from "../auth/Authcontext";
import Alertcontext from "../Alert/Alertcontext";
export const Register = props => {
  const alertcontext = useContext(Alertcontext);
  const authcontext = useContext(Authcontext);

  const { register, error, clearError, reg, clearRegister } = authcontext;

  useEffect(() => {
    if (error === "user already exists") {
      alertcontext.setAlert(error, "danger");
      clearError();
    } else if (password !== password2) {
      alertcontext.setAlert("Password Does not Match", "danger");
      clearError();
    } else if (
      (emp_id.slice(0, 2) !== "EX" ||
        emp_id.slice(0, 2) !== "TC" ||
        emp_id.slice(0, 2) !== "MA") &&
      emp_id.length != 7 &&
      emp_id.length != 0
    ) {
      alertcontext.setAlert("Enter Valid Employee ID", "danger");
    } else if (reg === true) {
      alertcontext.setAlert("Successfully Submitted", "success");
      clearRegister();
    }

    // eslint-disable-next-line
  }, [reg, error]);
  // eslint-disable-next-line

  const [user, setUser] = useState({
    name: "",
    emp_id: "",
    email: "",
    password: "",
    password2: ""
  });

  const { name, emp_id, email, password, password2, file } = user;

  const onChange = e =>
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });

  const onSubmit = e => {
    e.preventDefault();

    register({
      name,
      emp_id,
      email,
      password
    });
  };

  return (
    <div className="container">
      <h1>
        Account <span className="text-primary">Register </span>
      </h1>
      <form
        className="form-group"
        onSubmit={onSubmit}
        encType="multipart/form-data"
      >
        <label htmlFor="name">Name </label>
        <input
          className="form-control"
          type="text"
          name="name"
          value={name}
          onChange={onChange}
          required
        />

        <label htmlFor="emp_id">Employee ID </label>
        <input
          className="form-control"
          type="text"
          name="emp_id"
          value={emp_id}
          onChange={onChange}
          required
        />

        <label htmlFor="email">Email Address </label>
        <input
          className="form-control"
          type="email"
          name="email"
          value={email}
          onChange={onChange}
          required
        />

        <label htmlFor="password">Password </label>
        <input
          className="form-control"
          type="password"
          name="password"
          value={password}
          onChange={onChange}
        />

        <label htmlFor="password2">Confirm Password </label>
        <input
          className="form-control"
          type="password"
          name="password2"
          value={password2}
          onChange={onChange}
          required
        />

        <input type="submit" value="Register" className="btn btn-primary" />
      </form>
    </div>
  );
};

export default Register;
