import React from "react";
import PropTypes from "prop-types";

import "./LinkItem.scss";

const LinkItem = (props) => {
  const { linkData, deleteLink, onLinkClick } = props;
  const { name, url, icon } = linkData;

  return (
    <div className="linkItem">
      <img
        src={icon || "/img/anonymous.png"}
        alt="/"
        onError={(e) => (e.target.src = "/img/anonymous.png")}
      />
      <div className="linkTitle">
        <h3>{name}</h3>
      </div>
      <div className="linkUrl">
        <a href={url} target="blank" onClick={onLinkClick}>
          {url}
        </a>
      </div>
      <div className="deleteBtn">
        <button type="button" onClick={deleteLink}>
          <i className="fa fa-times-circle" />
        </button>
      </div>
    </div>
  );
};

LinkItem.propTypes = {
  deleteLink: PropTypes.func.isRequired,
  onLinkClick: PropTypes.func.isRequired,
  linkData: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
    icon: PropTypes.arrayOf(PropTypes.shape({})),
    linkId: PropTypes.string,
  }).isRequired,
};

export default LinkItem;
