import * as actionsTypes from "./actionsTypes";
import axios from "axios";

const logInCallBack = (data) => ({ type: actionsTypes.LOG_IN, data });
const logOutCallBack = () => ({ type: actionsTypes.LOG_OUT });
const isAdminLogged = (data) => ({ type: actionsTypes.IS_ADMIN_LOGGED, data });

export const checkIfUserLogged = () => async (dispatch) => {
  if (localStorage.session) {
    const data = JSON.parse(localStorage.session);
    dispatch(isAdminLogged(data));
  }
};

export const adminLogInAction = (email, password, redirect) => async (
  dispatch
) => {
  try {
    const response = await axios.post("https://blog-mongo-nadav.herokuapp.com/login/logIn", {
      email,
      password,
    });
    const { data = {} } = response;
    localStorage.session = JSON.stringify(data.session);
    dispatch(logInCallBack(data));
    redirect();
  } catch (error) {
    console.log(error);
  }
};

export const logOut = (adminId, redirect) => async (dispatch) => {
  localStorage.clear();
  try {
    await axios.post("https://blog-mongo-nadav.herokuapp.com/login/logout", {
      adminId: adminId,
    });
    dispatch(logOutCallBack());
    redirect();
  } catch (error) {
    console.log(error);
  }
};
