import React, { useState } from "react";
import cn from "classnames";
import PropTypes from "prop-types";

import LinkItem from "../LinkItem/LinkItem";

import "./LinksFolderItem.scss";

const LinksFolderItem = (props) => {
  const { folderData } = props;
  const { folderName, folderColor, links, _id } = folderData;
  const [isFoderOpen, setIsFoderOpen] = useState(false);

  return (
    <div className="folderItem">
      <div
        className={cn("folderTitle", isFoderOpen ? "openFolder" : null)}
        style={{ backgroundColor: folderColor }}
      >
        <h3>{`${folderName} (${links.length})`}</h3>
        <button type="button" onClick={() => {}}>
          <i className="fa fa-trash" />
        </button>
        <button type="button" onClick={() => {}}>
          <i className="fa fa-plus" />
        </button>
        <button
          type="button"
          onClick={() => setIsFoderOpen(!isFoderOpen)}
          disabled={links.length === 0 ? true : false}
          className="openTabBtn"
        >
          <i className="fa fa-arrow-up" />
        </button>
      </div>
      <div className={cn("folderContent", isFoderOpen ? "openFolder" : null)}>
        {links.map((link) => {
          return <LinkItem key={link.linkId} linkData={link} />;
        })}
      </div>
    </div>
  );
};

LinksFolderItem.propTypes = {
  folderData: PropTypes.shape({
    folderName: PropTypes.string,
    folderColor: PropTypes.string,
    links: PropTypes.arrayOf(PropTypes.shape({})),
    _id: PropTypes.string,
  }).isRequired,
};

export default LinksFolderItem;
