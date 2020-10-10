import * as actionsTypes from "../actions/actionsTypes";

const initialState = {
  isEditUserModalVisible: false,
  isMovieDetailsModalVisible: false,
  isSelectUserVisible: false,
  isCreatePostVisible: false,
  currentSystemUser: {},
};

const handleEditUserModalVisible = (state) => {
  const { isEditUserModalVisible } = state;

  return {
    ...state,
    isEditUserModalVisible: !isEditUserModalVisible,
  };
};

const handleMovieDetailsModalVisible = (state) => {
  const { isMovieDetailsModalVisible } = state;

  return {
    ...state,
    isMovieDetailsModalVisible: !isMovieDetailsModalVisible,
  };
};

const handleSelectUserVisible = (state) => {
  const { isSelectUserVisible } = state;

  return {
    ...state,
    isSelectUserVisible: !isSelectUserVisible,
  };
};

const handleCreatePostVisible = (state) => {
  const { isCreatePostVisible } = state;

  return {
    ...state,
    isCreatePostVisible: !isCreatePostVisible,
  };
};

const setCurrentUserState = (state, action) => {
  const { data } = action;

  return {
    ...state,
    currentSystemUser: data,
  };
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.OPEN_EDIT_USER_MODAL:
      return handleEditUserModalVisible(state);
    case actionsTypes.OPEN_MOVIE_DETAILS_MODAL:
      return handleMovieDetailsModalVisible(state);
    case actionsTypes.OPEN_SELECT_USER_MODAL:
      return handleSelectUserVisible(state);
    case actionsTypes.OPEN_CREATE_POST_MODAL:
      return handleCreatePostVisible(state);
    case actionsTypes.SET_CURRENT_USER_DATA:
      return setCurrentUserState(state, action);
    default:
      return state;
  }
};

export default mainReducer;
