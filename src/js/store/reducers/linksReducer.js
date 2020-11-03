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
  favoritesList: [],
};

const setLinksFolderState = (state, action) => {
  const { data } = action;

  let allLinksArray = [];
  data.forEach((folder) => {
    allLinksArray = [...allLinksArray, ...folder.links];
  });

  allLinksArray.sort((a, b) => {
    return a.entries - b.entries;
  });

  return {
    ...state,
    linksFolders: [...data],
    favoritesList: allLinksArray.reverse(),
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

const increseLinkEnteriesState = (state, action) => {
  const { data } = action;
  const { linksFolders } = state;
  const { folderId, linkId } = data;

  const foldersCopy = [...linksFolders];
  const folderSelectedIndex = foldersCopy.findIndex(
    (folder) => folder._id === folderId
  );
  let folderSelectedCopy = { ...foldersCopy[folderSelectedIndex] };
  let copyOfFoldersLinks = [...folderSelectedCopy.links];

  const findLinksIndex = copyOfFoldersLinks.findIndex(
    (link) => link.linkId === linkId
  );
  let copyOfLinkSelected = { ...copyOfFoldersLinks[findLinksIndex] };

  copyOfLinkSelected.entries = copyOfLinkSelected.entries + 1;

  copyOfFoldersLinks[findLinksIndex] = copyOfLinkSelected;
  folderSelectedCopy.links = copyOfFoldersLinks;
  foldersCopy[folderSelectedIndex] = folderSelectedCopy;

  let allLinksArray = [];
  foldersCopy.forEach((folder) => {
    allLinksArray = [...allLinksArray, ...folder.links];
  });

  allLinksArray.sort((a, b) => {
    return a.entries - b.entries;
  });

  return {
    ...state,
    linksFolders: foldersCopy,
    favoritesList: allLinksArray.reverse(),
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

const deleteFolderState = (state, action) => {
  const { folderId } = action;
  const { linksFolders } = state;

  let folderListCopy = [...linksFolders];
  folderListCopy = folderListCopy.filter((folder) => folder._id !== folderId);

  return {
    ...state,
    linksFolders: folderListCopy,
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
    case actiosTypes.DELETE_FOLDER:
      return deleteFolderState(state, action);
    case actiosTypes.INCRESE_LINK:
      return increseLinkEnteriesState(state, action);
    default:
      return state;
  }
};

export default linksReducer;
