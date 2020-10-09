import * as actionsTypes from "./actionsTypes";
import axios from "axios";

const allUsersCallback = (data) => ({ type: actionsTypes.SET_ALL_USERS, data });
const setUserToEditData = (id) => ({ type: actionsTypes.SET_USER_TO_EDIT, id });
const updateUserCallback = (data) => ({
  type: actionsTypes.UPDATE_USER_CALLBACK,
  data,
});
const deleteUserCallback = (deleteId) => ({
  type: actionsTypes.DELETE_USER,
  deleteId,
});

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

export const updateUserDateAction = (userData) => async (dispatch) => {
  const {
    id,
    userImg,
    userName,
    userAge,
    userBirtDay,
    userEmail,
    userWork,
  } = userData;
  try {
    await axios.put(
      `https://blog-mongo-nadav.herokuapp.com/users/updateone/${id}`,
      {
        img: userImg,
        name: userName,
        birtDay: userBirtDay,
        work: userWork,
        email: userEmail,
        age: userAge,
      }
    );
    dispatch(updateUserCallback(userData));
  } catch (error) {
    console.log(error);
  }
};

export const deleteUserAction = (deleteId) => async (dispatch) => {
  try {
    await axios.delete(
      `https://blog-mongo-nadav.herokuapp.com/users/${deleteId}`
    );
    dispatch(deleteUserCallback(deleteId));
  } catch (error) {
    console.log(error);
  }
};
