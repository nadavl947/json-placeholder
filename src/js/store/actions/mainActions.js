import * as actionsTypes from "./actionsTypes";

const openEditUserCallback = () => ({
  type: actionsTypes.OPEN_EDIT_USER_MODAL,
});

const openMovieDetailsCallback = () => ({
  type: actionsTypes.OPEN_MOVIE_DETAILS_MODAL,
});

const openSelectUserCallback = () => ({
  type: actionsTypes.OPEN_SELECT_USER_MODAL,
});

const openCreatePostCallback = () => ({
  type: actionsTypes.OPEN_CREATE_POST_MODAL,
});

const openCreateFolderModal = () => ({
  type: actionsTypes.OPEN_CREATE_FOLDER_MODAL,
});

const openAddLinkModal = () => ({
  type: actionsTypes.OPEN_ADD_LINK_MODAL,
});

const setCurrentUserata = (data) => ({
  type: actionsTypes.SET_CURRENT_USER_DATA,
  data,
});

export const openEditUserAction = () => async (dispatch) => {
  dispatch(openEditUserCallback());
};

export const openMovieDetailsModalAction = () => async (dispatch) => {
  dispatch(openMovieDetailsCallback());
};

export const openSelectUserModalAction = () => async (dispatch) => {
  dispatch(openSelectUserCallback());
};

export const openCreatePostModal = () => async (dispatch) => {
  dispatch(openCreatePostCallback());
};

export const selecteCurrentUser = (currentUserData) => async (dispatch) => {
  dispatch(setCurrentUserata(currentUserData));
};

export const openCreateFolderModalAction = () => async (dispatch) => {
  dispatch(openCreateFolderModal());
};

export const openAddLinkModalAction = () => async (dispatch) => {
  dispatch(openAddLinkModal());
};
