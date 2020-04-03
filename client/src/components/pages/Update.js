import React, { useContext, useEffect, useState } from "react";
import Authcontext from "../auth/Authcontext";
import authContext from "../auth/Authcontext";
import Alertcontext from "../Alert/Alertcontext";
export const Update = props => {
  const authcontext = useContext(Authcontext);
  const alertcontext = useContext(Alertcontext);

  const {
    Daily,
    isAuthenticated,
    error,
    clearError,
    clearUpdate,
    dailyUpdate
  } = authcontext;

  const [user, setUser] = useState({
    task: "",
    work: "",
    hour: ""
  });

  useEffect(() => {
    if (error === "DailyUpdate already exists") {
      alertcontext.setAlert(error, "danger");
      clearError();
    } else if (dailyUpdate === true) {
      alertcontext.setAlert("Successfully Submitted", "success");
      clearUpdate();
    }
  }, [error, dailyUpdate]);

  const { task, work, hour } = user;

  const onChange = e =>
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });

  const onSubmit = e => {
    e.preventDefault();

    Daily({
      task,
      work,
      hour
    });
  };
  //  const AuthContext = useContext(Authcontext);

  // eslint-disable-next-line

  useEffect(() => {
    authcontext.loadUser();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="container">
      <h1>
        <span className="text-primary"> Daily Update </span>
      </h1>
      <form className="form-group" onSubmit={onSubmit}>
        <label htmlFor="task">Task </label>
        <input
          className="form-control"
          type="text"
          name="task"
          value={task}
          onChange={onChange}
          required
          placeholder="Task"
        />

        <label htmlFor="Work">Work Description </label>
        <input
          className="form-control"
          type="textfield"
          name="work"
          value={work}
          onChange={onChange}
          required
          placeholder="Work"
        />

        <label htmlFor="hour">No of Hour</label>
        <input
          className="form-control"
          type="number"
          name="hour"
          min="1"
          max="8"
          value={hour}
          onChange={onChange}
          placeholder="Hour"
        />

        <input type="submit" value="Submit" className="btn btn-success" />
      </form>
    </div>
  );
};

export default Update;
