import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/actions";
import PropTypes from "prop-types";

import LinksFolderItem from "../../components/AdminSectionMain/LinksFolderItem/LinksFolderItem";

import "./AdminSectionMain.scss";

class AdminSectionMain extends Component {
  state = {};

  componentDidMount() {
    const { getAllLinks } = this.props;
    getAllLinks();
  }

  render() {
    const { linksList, openAddFolder } = this.props;
    return (
      <div className="adminSection">
        <div className="addFolderBtn">
          <button type="button" onClick={() => openAddFolder()}>
            Add New Folder
          </button>
        </div>
        <div className="foldersList">
          {linksList.map((folder) => {
            return <LinksFolderItem key={folder._id} folderData={folder} />;
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
    getAllLinks: () => dispatch(actions.getAllLinksFoldersAction()),
    openAddFolder: () => dispatch(actions.openCreateFolderModalAction()),
  };
};

AdminSectionMain.propTypes = {
  getAllLinks: PropTypes.func.isRequired,
  openAddFolder: PropTypes.func.isRequired,
  linksList: PropTypes.arrayOf(PropTypes.shape({})),
};

AdminSectionMain.defaultProps = {
  linksList: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminSectionMain);
