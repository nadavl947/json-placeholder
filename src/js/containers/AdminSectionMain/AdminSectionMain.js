import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/actions";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";

import LinksFolderItem from "../../components/AdminSectionMain/LinksFolderItem/LinksFolderItem";

import "./AdminSectionMain.scss";

class AdminSectionMain extends Component {
  state = {
    isLinksLoading: true,
  };

  openAddLinkToFolder = (folder) => {
    const { selectFolderAction, openAddLink } = this.props;
    openAddLink();
    selectFolderAction(folder);
  };

  componentDidMount() {
    const { getAllLinks } = this.props;
    getAllLinks(() => this.setState({ isLinksLoading: false }));
  }

  render() {
    const {
      linksList,
      openAddFolder,
      t,
      deleteLinkAction,
      deleteFolderAction,
      increseLinkEnteriesAction,
    } = this.props;
    const { isLinksLoading } = this.state;

    if (isLinksLoading) {
      return (
        <div className="spinner">
          <img src="/img/spiner2.gif" alt="/" />
        </div>
      );
    }

    return (
      <div className="adminSection">
        <div className="addFolderBtn">
          <button type="button" onClick={() => openAddFolder()}>
            {t("adminSection.newFolderBtn")}
          </button>
        </div>
        <div className="foldersList">
          {linksList.map((folder) => {
            return (
              <LinksFolderItem
                key={folder._id}
                folderData={folder}
                openAddLink={() => this.openAddLinkToFolder(folder)}
                deleteLink={(folderId, linkId) =>
                  deleteLinkAction(folderId, linkId)
                }
                onLinkClick={(folderId, linkId) =>
                  increseLinkEnteriesAction(folderId, linkId)
                }
                deleteFolder={() => deleteFolderAction(folder._id)}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    linksList: state.linksReducer.linksFolders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllLinks: (callback) =>
      dispatch(actions.getAllLinksFoldersAction(callback)),
    openAddFolder: () => dispatch(actions.openCreateFolderModalAction()),
    openAddLink: () => dispatch(actions.openAddLinkModalAction()),
    selectFolderAction: (folder) =>
      dispatch(actions.selectFolderAction(folder)),
    deleteLinkAction: (folderId, linkId) =>
      dispatch(actions.deleteLinkAction(folderId, linkId)),
    increseLinkEnteriesAction: (folderId, linkId) =>
      dispatch(actions.increseLinkEnteriesAction(folderId, linkId)),
    deleteFolderAction: (folderId) =>
      dispatch(actions.deleteFolderAction(folderId)),
  };
};

AdminSectionMain.propTypes = {
  getAllLinks: PropTypes.func.isRequired,
  openAddFolder: PropTypes.func.isRequired,
  openAddLink: PropTypes.func.isRequired,
  deleteLinkAction: PropTypes.func.isRequired,
  linksList: PropTypes.arrayOf(PropTypes.shape({})),
};

AdminSectionMain.defaultProps = {
  linksList: [],
};

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(AdminSectionMain)
);
