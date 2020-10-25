import * as actionsTypes from "../actions/actionsTypes";

const initialState = {
  moviesList: [],
  numberOfPagination: null,
  selectedMovieDetails: {},
  moviesLength: null,
};

const setMoviesListState = (state, action) => {
  const { data } = action;

  return {
    ...state,
    moviesList: data,
    numberOfPagination: 1,
  };
};

const setMoviesLengthState = (state, action) => {
  const { data } = action;

  return {
    ...state,
    moviesLength: +data.count,
  };
};

const setMoreMovieState = (state, action) => {
  const { data } = action;
  const { moviesList, numberOfPagination } = state;

  return {
    ...state,
    moviesList: [...moviesList, ...data],
    numberOfPagination: numberOfPagination + 1,
  };
};

const setMovieDetailsState = (state, action) => {
  const { id } = action;
  const { moviesList } = state;

  const movieDetails = moviesList.find((movie) => movie._id === id);
  return {
    ...state,
    selectedMovieDetails: movieDetails,
  };
};

const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.SET_ALL_MOVIES_LIST:
      return setMoviesListState(state, action);
    case actionsTypes.LOAD_MORE_MOVIES:
      return setMoreMovieState(state, action);
    case actionsTypes.SET_MOVIE_DETAILS:
      return setMovieDetailsState(state, action);
    case actionsTypes.SET_MOVIES_LENGTH:
      return setMoviesLengthState(state, action);
    default:
      return state;
  }
};

export default moviesReducer;
