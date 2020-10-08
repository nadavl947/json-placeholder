import * as actionsTypes from "../actions/actionsTypes";

const initialState = {
  isEditUserModalVisible: false,
};

const handleEditUserModalVisible = (state) => {
  const { isEditUserModalVisible } = state;

  return {
    ...state,
    isEditUserModalVisible: !isEditUserModalVisible,
  };
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.OPEN_EDIT_USER_MODAL:
      return handleEditUserModalVisible(state);
    default:
      return state;
  }
};

export default mainReducer;
