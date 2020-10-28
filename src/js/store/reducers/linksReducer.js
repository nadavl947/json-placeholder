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
  selectedFolderData: {},
};

const setLinksFolderState = (state, action) => {
  const { data } = action;

  return {
    ...state,
    linksFolders: [...data],
  };
};

const addNewLinkToState = (state, action) => {
  const { data } = action;
  const { linksFolders } = state;
  const { name, url, icon, folderId, newId } = data;

  const newLink = {
    name,
    url,
    icon,
    linkId: newId,
    entries: 1,
  };

  const allFoldersCopy = [...linksFolders];
  const folderSelectedIndex = allFoldersCopy.findIndex(
    (folder) => folder._id === folderId
  );
  const folderSelectedCopy = { ...allFoldersCopy[folderSelectedIndex] };
  let copyOfFoldersLinks = [...folderSelectedCopy.links];

  copyOfFoldersLinks = [...copyOfFoldersLinks, newLink];

  folderSelectedCopy.links = copyOfFoldersLinks;
  allFoldersCopy[folderSelectedIndex] = { ...folderSelectedCopy };

  return {
    ...state,
    linksFolders: allFoldersCopy,
  };
};

const deleteLinkFromState = (state, action) => {
  const { data } = action;
  const { linksFolders } = state;
  const { folderId, linkId } = data;

  const foldersCopy = [...linksFolders];
  const folderSelectedIndex = foldersCopy.findIndex(
    (folder) => folder._id === folderId
  );
  const folderSelectedCopy = { ...foldersCopy[folderSelectedIndex] };
  let copyOfFoldersLinks = [...folderSelectedCopy.links];

  copyOfFoldersLinks = copyOfFoldersLinks.filter(
    (link) => link.linkId !== linkId
  );

  folderSelectedCopy.links = copyOfFoldersLinks;
  foldersCopy[folderSelectedIndex] = { ...folderSelectedCopy };

  return {
    ...state,
    linksFolders: foldersCopy,
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

const handleSelectedFolder = (state, action) => {
  const { folderData } = action;
  return {
    ...state,
    selectedFolderData: { ...folderData },
  };
};

const linksReducer = (state = initialState, action) => {
  switch (action.type) {
    case actiosTypes.GET_ALL_LINKS:
      return setLinksFolderState(state, action);
    case actiosTypes.CREATE_NEW_FODER:
      return setNewFolderList(state, action);
    case actiosTypes.ON_FOLDER_SELECTED:
      return handleSelectedFolder(state, action);
    case actiosTypes.ADD_NEW_LINK:
      return addNewLinkToState(state, action);
    case actiosTypes.DELETE_LINK:
      return deleteLinkFromState(state, action);
    default:
      return state;
  }
};

export default linksReducer;
