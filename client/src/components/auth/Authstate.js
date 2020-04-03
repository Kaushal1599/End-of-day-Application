import React, { useReducer } from "react";
import AuthContext from "./Authcontext";
import AuthReducer from "./AuthReducer";
import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_ERROR,
  ISEXECUTIVE,
  ISMANAGER,
  ISTELECALLER,
  ROLE_FAIL,
  UPDATE_FAIL,
  FORM_FAIL,
  UPDATED,
  FORM_PASS,
  LOGOUT,
  CLEAR_UPDATE,
  CLEAR_FORM,
  CLEAR_LEAVE,
  CLEAR_RES,
  LEAVE
} from "../type";
import setAuthToken from "../../utils/setAuthToken";

const Authstate = props => {
  const initialState = {
    token: localStorage.getItem("token"),
    SearchName: localStorage.getItem("emp"),
    loading: true,
    isAuthenticated: null,
    error: null,
    user: null,
    reg: null,
    isExecutive: null,
    isTelecaller: null,
    isManager: null,
    dailyUpdate: null,
    form: null,
    leave: null
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  //load USer
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    // const role = formData.emp_id.slice(0, 2);
    // console.log(role);

    try {
      const res = await axios.get("./api/auth");

      // if (role === "EX") {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
      /*} else if (role === "TC") {
        dispatch({
          type: USER_LOADED,
          role: ISTELECALLER,
          payload: res.data
        });
      } else if (role === "MA") {
        dispatch({
          type: USER_LOADED,
          role: ISMANAGER,
          payload: res.data
        });

      }*/
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: err.response.data.msg
      });
    }
  };

  //Regsiter user

  const register = async formData => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const role = formData.emp_id.slice(0, 2);

    try {
      const res = await axios.post("./api/users", formData, config);

      console.log(res);

      dispatch({
        type: REGISTER_SUCCESS
      });
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg
      });
    }
  };

  //login user
  const login = async formData => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const role = formData.emp_id.slice(0, 2);
    try {
      const res = await axios.post("./api/auth", formData, config);
      if (role === "EX") {
        dispatch({
          type: LOGIN_SUCCESS,
          role: ISEXECUTIVE,
          payload: res.data
        });
      } else if (role === "TC") {
        dispatch({
          type: LOGIN_SUCCESS,
          role: ISTELECALLER,
          payload: res.data
        });
      } else if (role === "MA") {
        dispatch({
          type: LOGIN_SUCCESS,
          role: ISMANAGER,
          payload: res.data
        });
      }
    } catch (err) {
      console.log(err);

      dispatch({
        type: LOGIN_FAIL,
        role: ROLE_FAIL,
        payload: err.response.data.msg
      });
    }
  };

  //logout
  const logout = () => dispatch({ type: LOGOUT });

  //CLEAR ERROR

  const clearError = () => dispatch({ type: CLEAR_ERROR });

  //CLEAR UPDATE

  const clearUpdate = () => dispatch({ type: CLEAR_UPDATE });

  //CLEAR FORM

  const clearForm = () => dispatch({ type: CLEAR_FORM });
  // CLEAR REGISTER

  const clearRegister = () => dispatch({ type: CLEAR_RES });
  //CLEAR LEAVE
  const clearLeave = () => dispatch({ type: CLEAR_LEAVE });

  //Daily Update

  const Daily = async formData => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.post("./api/daily", formData, config);

      console.log(res);
      dispatch({
        type: UPDATED
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: UPDATE_FAIL,
        payload: err.response.data.msg
      });
    }
  };

  //Leave

  const Leave = async formData => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.post("./api/leave", formData, config);

      dispatch({
        type: LEAVE
      });

      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const Form = async formData => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      const res = await axios.post("./api/report", formData, config);
      console.log(res);
      dispatch({
        type: FORM_PASS
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: FORM_FAIL,
        payload: err.response.data.msg
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        SearchName: state.SearchName,
        user: state.user,
        error: state.error,
        isExecutive: state.isExecutive,
        isTelecaller: state.isTelecaller,
        isManager: state.isManager,
        form: state.form,
        dailyUpdate: state.dailyUpdate,
        leave: state.leave,
        reg: state.reg,
        register,
        login,
        logout,
        Daily,
        Leave,
        Form,
        clearError,
        clearForm,
        clearUpdate,
        clearLeave,
        loadUser,
        clearRegister
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default Authstate;
