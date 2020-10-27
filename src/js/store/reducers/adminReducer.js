import * as actionTypes from "../actions/actionsTypes";

const initialState = {
  isAdminLogged: null,
  adminConnected: {},
};

const setIsAdminLogged = (state, action) => {
  const { data } = action;
  const { adminConnected } = data;

  return {
    ...state,
    isAdminLogged: true,
    adminConnected: adminConnected,
  };
};

const setLogInState = (state, action) => {
  const { data } = action;
  return {
    ...state,
    isAdminLogged: data.success,
  };
};

const setLogOut = (state) => {
  return {
    ...state,
    isAdminLogged: false,
    adminConnected: {},
  };
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOG_IN:
      return setLogInState(state, action);
    case actionTypes.IS_ADMIN_LOGGED:
      return setIsAdminLogged(state, action);
    case actionTypes.LOG_OUT:
      return setLogOut(state);
    default:
      return state;
  }
};

export default adminReducer;
