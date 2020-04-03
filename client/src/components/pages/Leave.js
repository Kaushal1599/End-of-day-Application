import React, { useContext, useEffect, useState } from "react";
import Authcontext from "../auth/Authcontext";
import Alertcontext from "../Alert/Alertcontext";
export const Update = () => {
  const AuthContext = useContext(Authcontext);
  const alertcontext = useContext(Alertcontext);
  const { leave, clearLeave } = AuthContext;

  const [user, setUser] = useState({
    holiday: "",
    date: "",
    reason: ""
  });

  const { holiday, date, reason } = user;

  const onChange = e =>
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });

  const onSubmit = e => {
    e.preventDefault();

    AuthContext.Leave({
      holiday,
      date,
      reason
    });
  };

  useEffect(() => {
    if (leave === true) {
      alertcontext.setAlert("Successfully Submitted", "success");
      clearLeave();
    }
    AuthContext.loadUser();
  }, [leave]);

  return (
    <div className="container">
      <h1>
        <span className="text-primary"> Leave Form </span>
      </h1>
      <form className="form-group" onSubmit={onSubmit}>
        <label htmlFor="holiday">No of Holiday </label>
        <input
          className="form-control"
          type="number"
          name="holiday"
          min="1"
          max="10"
          value={holiday}
          onChange={onChange}
          required
          placeholder="Total Holiday"
        />

        <label htmlFor="date">Date </label>
        <input
          className="form-control"
          type="date"
          name="date"
          value={date}
          onChange={onChange}
          required
        />

        <label htmlFor="reason">Reason</label>
        <input
          className="form-control"
          type="textfield"
          name="reason"
          value={reason}
          onChange={onChange}
          placeholder="Reason"
        />
        <input type="submit" value="Submit" className="btn btn-success" />
      </form>
    </div>
  );
};

export default Update;
