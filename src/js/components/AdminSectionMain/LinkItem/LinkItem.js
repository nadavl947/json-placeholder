import React from "react";
import PropTypes from "prop-types";

import "./LinkItem.scss";

const LinkItem = (props) => {
  const { linkData } = props;
  const { name, url, icon, linkId } = linkData;

  return (
    <div className="linkItem">
      <img src={icon || "/img/anonymous.png"} alt="/" />
      <div className="linkTitle">
        <h3>{name}</h3>
      </div>
      <div className="linkUrl">
        <a href={url} target="blank">
          {url}
        </a>
      </div>
      <button type="button">
        <i className="fa fa-trash" />
      </button>
    </div>
  );
};

LinkItem.propTypes = {
  linkData: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
    icon: PropTypes.arrayOf(PropTypes.shape({})),
    linkId: PropTypes.string,
  }).isRequired,
};

export default LinkItem;
