import * as actionsTypes from "./actionsTypes";

const openEditUserCallback = () => ({
  type: actionsTypes.OPEN_EDIT_USER_MODAL,
});

export const openEditUserAction = () => async (dispatch) => {
  dispatch(openEditUserCallback());
};
