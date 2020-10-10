import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import * as actions from "../../../store/actions/actions";

import "./MovieDetails.scss";

const MovieDetails = () => {
  const dispatch = useDispatch();

  const movieDetails = useSelector(
    (state) => state.moviesReducer.selectedMovieDetails
  );
  const isMovieDetailsModalVisible = useSelector(
    (state) => state.mainReducer.isMovieDetailsModalVisible
  );

  const movieDetailsRef = useRef(null);

  useEffect(() => {
    const eventListener = (e) => {
      if (isMovieDetailsModalVisible) {
        if (!movieDetailsRef.current.contains(e.target)) {
          dispatch(actions.openMovieDetailsModalAction());
        }
      }
    };
    document.addEventListener("mousedown", eventListener);
    return () => {
      document.removeEventListener("mousedown", eventListener);
    };
  }, [isMovieDetailsModalVisible, dispatch]);

  const createYellowStars = () => {
    const yellowArray = [];
    for (var i = 0; i < Math.floor(movieDetails.rating.average); i++) {
      yellowArray.push(<i className="fa fa-star yelloStar yellowStart" key={i}/>);
    }
    return yellowArray.map((item) => item);
  };

  const createGreyStarts = () => {
    const yellowArray = [];
    for (var i = 0; i < 10 - Math.floor(movieDetails.rating.average); i++) {
      yellowArray.push(<i className="fa fa-star" key={i} />);
    }
    return yellowArray.map((item) => item);
  };

  return (
    <div className="movieDetailsContainer">
      <div className="movieDetailsContent" ref={movieDetailsRef}>
        <div className="movieImageSection">
          {movieDetails.image && (
            <img src={movieDetails.image.original} alt={movieDetails.name} />
          )}
        </div>
        <div className="detailsSection">
          <div className="closeModalBtn">
            <button
              type="button"
              onClick={() => dispatch(actions.openMovieDetailsModalAction())}
            >
              X
            </button>
          </div>
          <div className="detailsList">
            <div className="movieTitle">
              <h3>{movieDetails.name}</h3>
            </div>
            <div className="topDetails">
              <p>{`${movieDetails.runtime} min`}</p>
              <p>{movieDetails.genres[0]}</p>
              {movieDetails.network && (
                <p>{movieDetails.network.country.name}</p>
              )}
            </div>
            <div className="movieSummery">
              <h3>{movieDetails.summary.replace(/(<([^>]+)>)/gi, "")}</h3>
            </div>
            {movieDetails.rating && (
              <div className="movieRating">
                <p>Rating - </p>
                <div className="starsSection">
                  <div className="yelloStar">{createYellowStars()}</div>
                  <div className="greyStar">{createGreyStarts()}</div>
                </div>
                <p>{`/ ${movieDetails.rating.average}`}</p>
              </div>
            )}
            {movieDetails.network && (
              <div className="network">
                <p>NetWork - </p>
                <h3>{movieDetails.network.name}</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

MovieDetails.propTypes = {
  movieData: PropTypes.shape({
    image: PropTypes.shape({ original: PropTypes.string }),
    name: PropTypes.string,
    runtime: PropTypes.number,
    genres: PropTypes.arrayOf(PropTypes.string),
    network: PropTypes.shape({
      country: PropTypes.shape({ name: PropTypes.string }),
      name: PropTypes.string,
    }),
    rating: PropTypes.number,
  }).isRequired,
};

export default MovieDetails;
