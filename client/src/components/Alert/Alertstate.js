import React, { useReducer } from "react";
import Alertcontext from "./Alertcontext";
import uuid from "uuid/v4";
import Alertreducer from "./AlertReducer";
import { SET_ALERT, REMOVE_ALERT } from "../type";

const Alertstate = props => {
  const initialState = [];
  const [state, dispatch] = useReducer(Alertreducer, initialState);

  // set alert

  const setAlert = (msg, type) => {
    const id = uuid();
    dispatch({
      type: SET_ALERT,
      payload: { msg, type, id }
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 2000);
  };

  return (
    <Alertcontext.Provider
      value={{
        alerts: state,
        setAlert
      }}
    >
      {props.children}
    </Alertcontext.Provider>
  );
};

export default Alertstate;
