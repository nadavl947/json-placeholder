import React from "react";
import PropTypes from "prop-types";

import "./FavoritItam.scss";

const FavoritItam = (props) => {
  const { favoritData } = props;
  const { name, url, icon } = favoritData;

  return (
    <a href={url} target="blank" className="favoritItem">
      <img
        src={icon || "/img/anonymous.png"}
        alt="/"
        onError={(e) => (e.target.src = "/img/anonymous.png")}
      />
      <h3>{name}</h3>
    </a>
  );
};

FavoritItam.propTypes = {
  favoritData: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
    icon: PropTypes.string,
  }).isRequired,
};

export default FavoritItam;
