import * as actiosTypes from "../actions/actionsTypes";

const initialState = {
  linksFolders: [],
  folderColorsOptions: [
    {
      id: 1,
      color: "#7b61ff",
    },
    {
      id: 2,
      color: "#38c9d2",
    },
    {
      id: 3,
      color: "#23bc4c",
    },
    {
      id: 4,
      color: "#ffa94f",
    },
    {
      id: 5,
      color: "#ff494c",
    },
    {
      id: 6,
      color: "#0f314a",
    },
  ],
};

const setLinksFolderState = (state, action) => {
  const { data } = action;

  return {
    ...state,
    linksFolders: [...data],
  };
};

const setNewFolderList = (state, action) => {
  const { data } = action;
  const { linksFolders } = state;

  return {
    ...state,
    linksFolders: [...linksFolders, data],
  };
};

const linksReducer = (state = initialState, action) => {
  switch (action.type) {
    case actiosTypes.GET_ALL_LINKS:
      return setLinksFolderState(state, action);
    case actiosTypes.CREATE_NEW_FODER:
      return setNewFolderList(state, action);
    default:
      return state;
  }
};

export default linksReducer;
