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
    const { getAllMovies } = this.props;
    getAllMovies();
  }

  render() {
    const { moviesList, numberOfPagination, loadMoeMovies, t } = this.props;

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
        <div className="loadMoreBtn">
          <button
            type="button"
            onClick={() => loadMoeMovies(numberOfPagination + 1)}
          >
            {t("moviesMain.more")}
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    moviesList: state.moviesReducer.moviesList,
    numberOfPagination: state.moviesReducer.numberOfPagination,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllMovies: () => dispatch(actions.getAllMoviesAction()),
    loadMoeMovies: (numberOfPagination) =>
      dispatch(actions.loadMoreMoviesActions(numberOfPagination)),
  };
};

MoviesMain.propTypes = {
  getAllMovies: PropTypes.func.isRequired,
  loadMoeMovies: PropTypes.func.isRequired,
  numberOfPagination: PropTypes.number,
};

MoviesMain.defaultProps = {
  numberOfPagination: null,
};

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(MoviesMain)
);
