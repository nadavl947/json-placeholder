import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import * as actions from "../../../store/actions/actions";

import "./MovieItem.scss";

const MovieItem = (props) => {
  const { movieData } = props;
  const dispatch = useDispatch();

  return (
    <button
      type="button"
      className="movieItem"
      onClick={() => {
        dispatch(actions.openMovieDetailsModalAction());
        dispatch(actions.getMovieDetailsAction(movieData._id));
      }}
    >
      <img src={movieData.image.original} alt={movieData.name} />
      <div className="detailsCover">
        <div className="centerPluse">
          <h3>+</h3>
        </div>
      </div>
    </button>
  );
};

MovieItem.propTypes = {
  movieData: PropTypes.shape({
    image: PropTypes.shape({ original: PropTypes.string }),
    name: PropTypes.string,
  }).isRequired,
};

export default MovieItem;
