import * as actionsTypes from "../actions/actionsTypes";

const initialState = {
  usersList: [],
  selectedUserData: {},
};

const setAllUsersList = (state, action) => {
  const { data } = action;

  return {
    ...state,
    usersList: data,
  };
};

const setUserToEdirData = (state, action) => {
  const { id } = action;
  const { usersList } = state;

  const userData = usersList.find((user) => user._id === id);
  return {
    ...state,
    selectedUserData: userData,
  };
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.SET_ALL_USERS:
      return setAllUsersList(state, action);
    case actionsTypes.SET_USER_TO_EDIT:
      return setUserToEdirData(state, action);
    default:
      return state;
  }
};

export default usersReducer;
