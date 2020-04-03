import React, { useState, useEffect, useContext } from "react";
import authContext from "../auth/Authcontext";
import axios from "axios";
import { Link } from "react-router-dom";
import Alertcontext from "../../components/Alert/Alertcontext";
export const Manager = () => {
  const alertcontext = useContext(Alertcontext);
  const emp_id = localStorage.getItem("emp_id");
  const emp = emp_id.slice(0, 2);
  const authcontext = useContext(authContext);
  const [Daily, setDaily] = useState([]);
  const [Form, setForm] = useState([]);
  //const [id0, setId0] = useState("");
  //const [id1, setId1] = useState("");
  const [Leave, setLeave] = useState([]);
  //const [idfromButton, setidfromButton] = useState("");
  //const [idfromButton1, setidfromButton1] = useState("");
  useEffect(() => {
    authcontext.loadUser();
    // eslint-disable-next-line
  }, []);
  const onsubmit = async () => {
    const id = localStorage.getItem("id");
    setLeave([]);
    setForm([]);

    try {
      //var url = ".api/daily/";
      //url = url + id;

      await axios.get("api/daily/" + id).then(res => {
        console.log(res);
        setDaily(res.data);
      });
    } catch (err) {
      alertcontext.setAlert(err.response.data[0], "danger");
      console.log(err);
    }
  };
  const onsubmit1 = async () => {
    const id = localStorage.getItem("id");
    setDaily([]);
    setForm([]);

    try {
      //var url = ".api/leave/find/";
      //url = url + id;

      await axios.get("api/leave/find/" + id).then(res => {
        console.log(res);
        setLeave(res.data);
      });
    } catch (err) {
      alertcontext.setAlert(err.response.data[0], "danger");
      console.log(err);
    }
  };
  const onsubmit2 = async () => {
    const id = localStorage.getItem("id");
    setDaily([]);
    setLeave([]);
    try {
      //var url = ".api/report/find/";
      //url = url + id;

      await axios.get("api/report/find/" + id).then(res => {
        console.log(res);
        setForm(res.data);
      });
    } catch (err) {
      alertcontext.setAlert(err.response.data[0], "danger");
      console.log(err);
    }
  };
  if (emp === "EX") {
    return (
      <div className="container">
        <div className="jumbotron">
          <h1>
            <span className="text-primary"> Manager Dashboard </span>
          </h1>
          <div className="card-header">
            <h3>
              <span className="text-primary">Executive Employee</span>
            </h3>
          </div>

          <div className="container">
            <ul>
              <li>
                <input
                  type="submit"
                  value=" Daily Update"
                  onClick={onsubmit}
                  className="btn btn-primary"
                />
              </li>
              <li>
                <input
                  type="submit"
                  value="Leave Applied"
                  onClick={onsubmit1}
                  className="btn btn-primary"
                />
              </li>
            </ul>
          </div>
        </div>

        {Leave.map(post => (
          <table className="table" width="100%">
            <tr>
              <th>Number of Holiday</th>
              <th>Date</th>
              <th>Reason</th>
            </tr>
            <tr>
              <td key={post._id}>{post.holiday}</td>
              <td>{post.date.slice(0, 10)}</td>
              <td>{post.reason}</td>
            </tr>
          </table>
        ))}

        {Daily.map(post => (
          <table className="table" width="100%">
            <tr>
              <th>Task</th>
              <th>Work</th>
              <th>Hour</th>
              <th>Submitted On</th>
            </tr>
            <tr>
              <td key={post._id}>{post.task}</td>
              <td>{post.work}</td>
              <td>{post.hour}</td>
              <td>{post.date.slice(0, 10)}</td>
            </tr>
          </table>
        ))}
      </div>
    );
  } else if (emp === "TC") {
    return (
      <div className="container">
        <div className="jumbotron">
          <h1>
            <span className="text-primary"> Manager Dashboard </span>
          </h1>
          <div className="card-header">
            <h3>
              <span className="text-primary">TeleCaller Employee</span>
            </h3>
          </div>

          <div className="container">
            <ul>
              <li>
                <input
                  type="submit"
                  value=" Daily Update"
                  onClick={onsubmit}
                  className="btn btn-primary"
                />
              </li>
              <li>
                <input
                  type="submit"
                  value="Leave Applied"
                  onClick={onsubmit1}
                  className="btn btn-primary"
                />
              </li>
              <li>
                <input
                  type="submit"
                  value="Form Detail"
                  onClick={onsubmit2}
                  className="btn btn-primary"
                />
              </li>
            </ul>
          </div>
        </div>

        {Leave.map(post => (
          <table className="table" width="100%">
            <tr>
              <th>Number of Holiday</th>
              <th>Date</th>
              <th>Reason</th>
            </tr>
            <tr>
              <td key={post._id}>{post.holiday}</td>
              <td>{post.date.slice(0, 10)}</td>
              <td>{post.reason}</td>
            </tr>
          </table>
        ))}

        {Daily.map(post => (
          <table className="table" width="100%">
            <tr>
              <th>Task</th>
              <th>Work</th>
              <th>Hour</th>
              <th>Submitted On</th>
            </tr>
            <tr>
              <td key={post._id}>{post.task}</td>
              <td>{post.work}</td>
              <td>{post.hour}</td>
              <td>{post.date.slice(0, 10)}</td>
            </tr>
          </table>
        ))}
        {Form.map(post => (
          <div className="container">
            <table className="table" width="100%">
              <tr>
                <th>Total Call</th>
                <th>Call Recieved</th>
                <th>Not Recieved</th>
                <th>Response</th>
                <th>Submitted On</th>
              </tr>
              <tr>
                <td key={post._id}>{post.total}</td>
                <td>{post.recieved}</td>
                <td>{post.not_recieved}</td>
                <td>{post.response}</td>
                <td>{post.date.slice(0, 10)}</td>
              </tr>
            </table>
          </div>
        ))}
      </div>
    );
  }
};

export default Manager;
