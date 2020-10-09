import * as actionsTypes from "./actionsTypes";

const openEditUserCallback = () => ({
  type: actionsTypes.OPEN_EDIT_USER_MODAL,
});

const openMovieDetailsCallback = () => ({
  type: actionsTypes.OPEN_MOVIE_DETAILS_MODAL,
});

export const openEditUserAction = () => async (dispatch) => {
  dispatch(openEditUserCallback());
};

export const openMovieDetailsModalAction = () => async (dispatch) => {
  dispatch(openMovieDetailsCallback());
};
