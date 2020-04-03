import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  ISEXECUTIVE,
  ISMANAGER,
  ISTELECALLER,
  LOGOUT,
  CLEAR_ERROR,
  UPDATE_FAIL,
  FORM_FAIL,
  FORM_PASS,
  UPDATED,
  CLEAR_FORM,
  CLEAR_UPDATE,
  CLEAR_LEAVE,
  LEAVE,
  CLEAR_RES
} from "../type";

export default (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload
      };
    /*switch (action.role) {
        case ISTELECALLER:
          return {
            ...state,
            isAuthenticated: true,
            isTelecaller: true,
            loading: false,
            user: action.payload
          };

        case ISMANAGER:
          return {
            ...state,
            isAuthenticated: true,
            isManager: true,
            loading: false,
            user: action.payload
          };

        case ISEXECUTIVE:
          return {
            ...state,
            isAuthenticated: true,
            isExecutive: true,
            loading: false,
            user: action.payload
          };*/
    //}

    case REGISTER_SUCCESS:
      return {
        ...state,
        reg: true
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      switch (action.role) {
        case ISTELECALLER:
          return {
            ...state,
            isAuthenticated: true,
            isTelecaller: true,
            loading: false,
            user: action.payload
          };

        case ISMANAGER:
          return {
            ...state,
            isAuthenticated: true,
            isManager: true,
            loading: false,
            user: action.payload
          };

        case ISEXECUTIVE:
          return {
            ...state,
            isAuthenticated: true,
            isExecutive: true,
            loading: false,
            user: action.payload
          };
      }

    case REGISTER_FAIL:
      return {
        ...state,
        error: action.payload
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isExecutive: false,
        isManager: false,
        isTelecaller: false,
        loading: false,
        user: null,
        error: action.payload
      };
    case UPDATE_FAIL:
    case FORM_FAIL:
      return {
        ...state,
        error: action.payload
      };

    case FORM_PASS:
      return {
        ...state,
        form: true
      };
    case UPDATED:
      return {
        ...state,
        dailyUpdate: true
      };
    case LEAVE: {
      return {
        ...state,
        leave: true
      };
    }

    case CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
    case CLEAR_UPDATE:
      return {
        ...state,
        dailyUpdate: null
      };
    case CLEAR_FORM:
      return {
        ...state,
        form: null
      };
    case CLEAR_LEAVE:
      return {
        ...state,
        leave: null
      };
    case CLEAR_RES: {
      return {
        ...state,
        reg: null
      };
    }
  }
};
