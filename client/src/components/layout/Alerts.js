import React, { useContext } from "react";
import Alertcontext from "../../components/Alert/Alertcontext";

const Alerts = () => {
  const alertcontext = useContext(Alertcontext);
  //const { alerts } = alertcontext;

  //setAlert("hello", "danger");
  return (
    alertcontext.alerts.length > 0 &&
    alertcontext.alerts.map(alert => (
      <div key={alert.id} className={`alert alert-${alert.type}`}>
        {alert.msg}
      </div>
    ))
  );
};
export default Alerts;
