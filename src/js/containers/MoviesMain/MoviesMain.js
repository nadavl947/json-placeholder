import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";
import * as actions from "../../store/actions/actions";

import MovieItem from "../../components/MoviesMain/MovieItem/MovieItem";

import "./MoviesMain.scss";

class MoviesMain extends Component {
  state = {};

  componentDidMount() {
    const { getAllMovies, getMoviesLength } = this.props;
    getAllMovies();
    getMoviesLength();
  }

  render() {
    const {
      moviesList,
      numberOfPagination,
      loadMoeMovies,
      t,
      moviesLength,
    } = this.props;

    return (
      <div className="moviesMain">
        {!moviesList.length ? (
          <div className="spinner">
            <img src="/img/spiner2.gif" alt="/" />
          </div>
        ) : (
          <div className="moviesList">
            {moviesList.map((movie) => {
              return <MovieItem movieData={movie} key={movie._id} />;
            })}
          </div>
        )}
        {moviesLength - moviesList.length !== 0 && (
          <div className="loadMoreBtn">
            <button
              type="button"
              onClick={() => loadMoeMovies(numberOfPagination + 1)}
            >
              {t("moviesMain.more")}
            </button>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    moviesList: state.moviesReducer.moviesList,
    numberOfPagination: state.moviesReducer.numberOfPagination,
    moviesLength: state.moviesReducer.moviesLength,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllMovies: () => dispatch(actions.getAllMoviesAction()),
    getMoviesLength: () => dispatch(actions.getMoviesLength()),
    loadMoeMovies: (numberOfPagination) =>
      dispatch(actions.loadMoreMoviesActions(numberOfPagination)),
  };
};

MoviesMain.propTypes = {
  getAllMovies: PropTypes.func.isRequired,
  loadMoeMovies: PropTypes.func.isRequired,
  numberOfPagination: PropTypes.number,
  moviesLength: PropTypes.number,
};

MoviesMain.defaultProps = {
  numberOfPagination: null,
};

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(MoviesMain)
);
