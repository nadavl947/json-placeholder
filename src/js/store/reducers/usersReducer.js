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

const updateCurrentUser = (state, action) => {
  const { data } = action;
  const { usersList } = state;

  let copyOfUsersList = [...usersList];
  const userIndex = copyOfUsersList.findIndex((user) => user._id === data.id);
  let copyOfCurrentUser = { ...copyOfUsersList[userIndex] };

  copyOfCurrentUser = {
    _id: data.id,
    img: data.userImg,
    name: data.userName,
    birtDay: data.userBirtDay,
    work: data.userWork,
    email: data.userEmail,
    age: data.userAge,
  };

  copyOfUsersList[userIndex] = copyOfCurrentUser;

  return {
    ...state,
    usersList: copyOfUsersList,
  };
};

const setDeleteUserState = (state, action) => {
  const { deleteId } = action;
  const { usersList } = state;
  const userCopyArray = [...usersList];
  const usersFilterArray = userCopyArray.filter(
    (user) => user._id !== deleteId
  );

  return {
    ...state,
    usersList: usersFilterArray,
  };
};

const setNewUserState = (state, action) => {
  const { data } = action;
  const { usersList } = state;

  const newUserData = {
    img: data.avatarUrl,
    name: data.userName,
    birtDay: "",
    work: data.userWork,
    email: data.userEmail,
    age: data.userAge,
    _id: data._id,
  };

  return {
    ...state,
    usersList: [...usersList, newUserData],
  };
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.SET_ALL_USERS:
      return setAllUsersList(state, action);
    case actionsTypes.SET_USER_TO_EDIT:
      return setUserToEdirData(state, action);
    case actionsTypes.UPDATE_USER_CALLBACK:
      return updateCurrentUser(state, action);
    case actionsTypes.DELETE_USER:
      return setDeleteUserState(state, action);
    case actionsTypes.CREATE_NEW_USER:
      return setNewUserState(state, action);
    default:
      return state;
  }
};

export default usersReducer;
