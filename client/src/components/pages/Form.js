import React, { useContext, useEffect, useState } from "react";
import Alertcontext from "../Alert/Alertcontext";
import Authcontext from "../auth/Authcontext";
export const Form = () => {
  const AuthContext = useContext(Authcontext);
  const alertcontext = useContext(Alertcontext);
  const { form, clearForm, error, clearError } = AuthContext;

  const [user, setUser] = useState({
    total: "",
    recieved: "",
    response: ""
  });

  const { total, recieved, not_recieved, response } = user;

  const onChange = e =>
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });

  const onSubmit = e => {
    e.preventDefault();

    AuthContext.Form({
      total,
      recieved,
      not_recieved,
      response
    });
  };

  useEffect(() => {
    if (error === "Form already exists") {
      alertcontext.setAlert(error, "danger");
      clearError();
    } else if (form === true) {
      alertcontext.setAlert("Successfully Submitted", "success");
      clearForm();
    }
    AuthContext.loadUser();
  }, [error, form]);

  // eslint-disable-next-line

  return (
    <div className="container">
      <h1>
        <span className="text-primary"> Report Form </span>
      </h1>
      <form onSubmit={onSubmit} className="form-group">
        <label htmlFor="total">Total Calls </label>
        <input
          className="form-control"
          type="number"
          name="total"
          min="0"
          defaultValue="0"
          value={total}
          onChange={onChange}
          required
          placeholder="Total Calls"
        />

        <label htmlFor="recieved">Call Recieved </label>
        <input
          className="form-control"
          type="number"
          name="recieved"
          value={recieved}
          min="0"
          defaultValue="0"
          max={total}
          onChange={onChange}
          required
          placeholder="Call Recieved"
        />

        <label htmlFor="not_recieved">Not Recieved</label>
        <input
          className="form-control"
          type="number"
          name="not_recieved"
          min="0"
          value={not_recieved}
          onChange={onChange}
          placeholder="Call Not Recieved"
        />

        <label htmlFor="response">Response</label>
        <input
          className="form-control"
          type="text"
          name="response"
          value={response}
          onChange={onChange}
          required
          placeholder="Response"
        />

        <input type="submit" value="Submit" className="btn btn-success" />
      </form>
    </div>
  );
};

export default Form;
