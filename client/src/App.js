import React, { Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Update from "./components/pages/Update";
import About from "./components/pages/About";
import Leave from "./components/pages/Leave";
import Form from "./components/pages/Form";
import Manager from "./components/pages/Manager";
import Authstate from "./components/auth/Authstate";
import setAuthToken from "./utils/setAuthToken";
import Register from "./components/pages/Register";
import login from "./components/Logs/login";
import PrivateEx from "./components/routing/PrivateEx";
import PrivateTeleCaller from "./components/routing/PrivateTeleCaller";
import Private from "./components/routing/Private";
import Dashboard from "./components/pages/Dashboard";
import PrivateManager from "./components/routing/PrivateManager";
import Alertstate from "./components/Alert/Alertstate";
import Alerts from "./components/layout/Alerts";
if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  return (
    <Authstate>
      <Alertstate>
        {" "}
        <Router>
          <Fragment>
            <Navbar />

            <div className="container">
              <Alerts />
              <Switch>
                <PrivateEx exact path="/update" component={Update} />
                <Private exact path="/" component={Dashboard} />
                <PrivateEx exact path="/leave" component={Leave} />
                <PrivateTeleCaller exact path="/form" component={Form} />
                <Route exact path="/about" component={About} />
                <PrivateManager exact path="/Manager" component={Manager} />
                <PrivateManager exact path="/Register" component={Register} />
                <Route exact path="/login" component={login} />
              </Switch>
            </div>
          </Fragment>
        </Router>
      </Alertstate>
    </Authstate>
  );
};

export default App;
