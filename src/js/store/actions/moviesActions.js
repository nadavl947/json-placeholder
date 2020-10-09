import * as actionsTypes from "./actionsTypes";
import axios from "axios";

const getAllMoviesCallback = (data) => ({
  type: actionsTypes.SET_ALL_MOVIES_LIST,
  data,
});

const LoadMoreMoviesCallback = (data) => ({
  type: actionsTypes.LOAD_MORE_MOVIES,
  data,
});

const setMovieDetailsCallBack = (id) => ({ type: actionsTypes.SET_MOVIE_DETAILS, id });


export const getAllMoviesAction = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://blog-mongo-nadav.herokuapp.com/movies/1`
    );
    const { data = {} } = response;
    dispatch(getAllMoviesCallback(data));
  } catch (error) {
    console.log(error);
  }
};

export const loadMoreMoviesActions = (numberOfPagination) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://blog-mongo-nadav.herokuapp.com/movies/${numberOfPagination}`
    );
    const { data = {} } = response;
    dispatch(LoadMoreMoviesCallback(data));
  } catch (error) {
    console.log(error);
  }
};

export const getMovieDetailsAction = (id) => (dispatch) => {
    dispatch(setMovieDetailsCallBack(id));
  };