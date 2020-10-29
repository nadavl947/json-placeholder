import React, { useState } from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";

import LinkItem from "../LinkItem/LinkItem";

import "./LinksFolderItem.scss";

const LinksFolderItem = (props) => {
  const { folderData, openAddLink, deleteLink, deleteFolder, t, onLinkClick } = props;
  const { folderName, folderColor, links, _id } = folderData;
  const [isFoderOpen, setIsFoderOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <div className="folderItem">
      <div
        className={cn("folderTitle", isFoderOpen ? "openFolder" : null)}
        style={{ backgroundColor: folderColor }}
      >
        <button
          className="folderNameButton"
          type="button"
          onClick={() => setIsFoderOpen(!isFoderOpen)}
        >
          <h3>{`${folderName} (${links.length})`}</h3>
        </button>
        <button type="button" onClick={() => setIsDeleteOpen(!isDeleteOpen)}>
          <i className="fa fa-times-circle" />
        </button>
        <div
          className={cn("deleteSection", isDeleteOpen ? "deleteOpen" : null)}
        >
          <p>{t("adminSection.delete_folder_text")}</p>
          <button type="button" onClick={deleteFolder}>
            {t("adminSection.delete")}
          </button>
        </div>
        <button type="button" onClick={openAddLink}>
          <i className="fa fa-plus" />
        </button>
        <button
          type="button"
          onClick={() => setIsFoderOpen(!isFoderOpen)}
          className="openTabBtn"
        >
          <i className="fa fa-arrow-up" />
        </button>
      </div>
      <div className={cn("folderContent", isFoderOpen ? "openFolder" : null)}>
        {links.map((link) => {
          return (
            <LinkItem
              key={link.linkId}
              linkData={link}
              deleteLink={() => deleteLink(_id, link.linkId)}
              onLinkClick={() => onLinkClick(_id, link.linkId)}
            />
          );
        })}
      </div>
    </div>
  );
};

LinksFolderItem.propTypes = {
  openAddLink: PropTypes.func.isRequired,
  deleteLink: PropTypes.func.isRequired,
  deleteFolder: PropTypes.func.isRequired,
  onLinkClick: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  folderData: PropTypes.shape({
    folderName: PropTypes.string,
    folderColor: PropTypes.string,
    links: PropTypes.arrayOf(PropTypes.shape({})),
    _id: PropTypes.string,
  }).isRequired,
};

export default withTranslation()(LinksFolderItem);
