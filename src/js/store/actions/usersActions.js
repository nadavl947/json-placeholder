import * as actionsTypes from "./actionsTypes";
import axios from "axios";

const allUsersCallback = (data) => ({ type: actionsTypes.SET_ALL_USERS, data });
const setUserToEditData = (id) => ({ type: actionsTypes.SET_USER_TO_EDIT, id });

export const getAllUsersAction = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "https://blog-mongo-nadav.herokuapp.com/users"
    );
    const { data = {} } = response;
    dispatch(allUsersCallback(data));
  } catch (error) {
    console.log(error);
  }
};

export const getEditUserData = (id) => (dispatch) => {
  dispatch(setUserToEditData(id));
};
