import * as actionsTypes from "../actions/actionsTypes";

const initialState = {
  isEditUserModalVisible: false,
  isMovieDetailsModalVisible: false,
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

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.OPEN_EDIT_USER_MODAL:
      return handleEditUserModalVisible(state);
    case actionsTypes.OPEN_MOVIE_DETAILS_MODAL:
      return handleMovieDetailsModalVisible(state);
    default:
      return state;
  }
};

export default mainReducer;
