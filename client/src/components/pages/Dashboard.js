import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../components/auth/Authcontext";
import axios from "axios";
import Alertcontext from "../../components/Alert/Alertcontext";
export const Dashboard = () => {
  const authcontext = useContext(AuthContext);
  const alertcontext = useContext(Alertcontext);
  const [posts, setPosts] = useState([]);
  const [id, setId] = useState("");
  const [idfromButton, setidfromButton] = useState("");
  const onsubmit = async () => {
    localStorage.setItem("id", id);
    console.log(id);
    setidfromButton(id);
    console.log(idfromButton);

    try {
      var url = "http://localhost:5000/api/daily/find/";
      url = url + id;

      await axios.get(url).then(res => {
        localStorage.setItem("emp_id", res.data[0].emp_id);
        setPosts(res.data);
        //console.log(res.data);
      });
    } catch (err) {
      alertcontext.setAlert(err.response.data[0], "danger");

      console.log(err);
    }
  };
  const { user, isManager, isTelecaller, isExecutive } = authcontext;

  if (isExecutive) {
    return (
      <div className="container">
        <div className="card-header">
          <strong>
            <h1 className="text-primary">Exceutive Dashboard!!</h1>
          </strong>
        </div>

        <div className="card-title">
          <h3>HELLO {user && user.name}</h3>
        </div>
        <ul>
          <li>
            <Link to="/Update">
              <h3 className="text-primary"> Daily Update </h3>
            </Link>
          </li>
          <Link to="/Leave">
            <h3 className="text-primary"> Apply For Leave </h3>
          </Link>
        </ul>
      </div>
    );
  } else if (isTelecaller) {
    return (
      <div className="container">
        <div className="card-header">
          <strong>
            {" "}
            <h1 className="text-primary">TeleCaller Dashboard!!</h1>
          </strong>
        </div>
        <div className="card-body">
          <h3>HELLO {user && user.name}</h3>
          <ul>
            <li>
              <Link to="/Update">
                <h3 className="text-primary"> Daily Update </h3>
              </Link>
            </li>
            <li>
              <Link to="/Leave">
                <h3 className="text-primary"> Apply For Leave </h3>
              </Link>
            </li>
            <li>
              <Link to="/Form">
                <h3 className="text-primary"> Daily Form </h3>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  } else if (isManager) {
    return (
      <div className="container">
        <div className="jumbotron">
          <h1>
            <strong>
              {" "}
              <span className="text-primary"> Manager Dashboard </span>{" "}
            </strong>
          </h1>
        </div>
        <div className="form-group">
          <label htmlFor="emp">Search for Employee </label>
          <input
            className="form-control"
            type="text"
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <input
            type="submit"
            value="Search"
            onClick={onsubmit}
            className="btn btn-primary"
          />
        </div>

        {posts.map(post => (
          <div className="container">
            <div className="card w-50">
              <div className="card-header">
                <strong key={post._id}>
                  <h4>
                    Name:-<Link to="/Manager">{post.name} </Link>
                  </h4>
                </strong>
              </div>
              <div className="card-body">
                <p>
                  {" "}
                  <strong>Emp_ID:- {post.emp_id}</strong>
                </p>

                <p>
                  {" "}
                  <strong>Email:- {post.email}</strong>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
};

export default Dashboard;
