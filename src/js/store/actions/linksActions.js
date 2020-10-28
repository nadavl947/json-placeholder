import * as actionsTypes from "./actionsTypes";
import axios from "axios";

const getAllLinksCallback = (data) => ({
  type: actionsTypes.GET_ALL_LINKS,
  data,
});

const addNewLinkCallBack = (data) => ({
  type: actionsTypes.ADD_NEW_LINK,
  data,
});

const deleteLinkCallback = (data) => ({
  type: actionsTypes.DELETE_LINK,
  data,
});

const createNewFolderCallback = (data) => ({
  type: actionsTypes.CREATE_NEW_FODER,
  data,
});

const selectFolderCallback = (folderData) => ({
  type: actionsTypes.ON_FOLDER_SELECTED,
  folderData,
});

export const getAllLinksFoldersAction = (callback) => async (dispatch) => {
  try {
    const response = await axios.get(
      "https://blog-mongo-nadav.herokuapp.com/admin/links"
    );
    const { data = {} } = response;
    dispatch(getAllLinksCallback(data));
    callback();
  } catch (error) {
    console.log(error);
  }
};

export const addNewLinkAction = (name, url, icon, folderId, callback) => async (
  dispatch
) => {
  try {
    const response = await axios.post("https://blog-mongo-nadav.herokuapp.com/admin/links", {
      name,
      url,
      icon,
      folderId,
    });
    const { data = {} } = response;
    dispatch(
      addNewLinkCallBack({ name, url, icon, folderId, newId: data.newId })
    );
    callback();
  } catch (error) {
    console.log(error);
  }
};

export const deleteLinkAction = (folderId, linkId) => async (dispatch) => {
  try {
    await axios.delete(
      `https://blog-mongo-nadav.herokuapp.com/admin/links/${folderId}/${linkId}`
    );
    dispatch(deleteLinkCallback({ folderId, linkId }));
  } catch (error) {
    console.log(error);
  }
};

export const createNewFolderAction = (
  folderName,
  folderColor,
  callback
) => async (dispatch) => {
  try {
    const response = await axios.post(
      "https://blog-mongo-nadav.herokuapp.com/admin/folder",
      {
        folderName,
        folderColor,
      }
    );
    const { data = {} } = response;
    dispatch(createNewFolderCallback(data.ops[0]));
    callback();
  } catch (error) {
    console.log(error);
  }
};

export const selectFolderAction = (folderData) => (dispatch) => {
  dispatch(selectFolderCallback(folderData));
};
