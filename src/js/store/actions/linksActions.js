import * as actionsTypes from "./actionsTypes";
import axios from "axios";

const getAllLinksCallback = (data) => ({
  type: actionsTypes.GET_ALL_LINKS,
  data,
});

const createNewFolderCallback = (data) => ({
  type: actionsTypes.CREATE_NEW_FODER,
  data,
});

export const getAllLinksFoldersAction = () => async (dispatch) => {
  try {
    const response = await axios.get("https://blog-mongo-nadav.herokuapp.com/admin/links");
    const { data = {} } = response;
    dispatch(getAllLinksCallback(data));
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
    const response = await axios.post("https://blog-mongo-nadav.herokuapp.com/admin/folder", {
      folderName,
      folderColor,
    });
    const { data = {} } = response;
    dispatch(createNewFolderCallback(data.ops[0]));
    callback();
  } catch (error) {
    console.log(error);
  }
};
