import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import cn from "classnames";
import * as actions from "../../store/actions/actions";

import PostItem from "../../components/PostsMain/PostItem/PostItem";

import "./PostsMain.scss";

class PostsMain extends Component {
  state = {};

  componentDidMount() {
    const { getAllUsers, getAllPosts } = this.props;
    getAllUsers();
    getAllPosts();
  }

  handleAddNewComment = (postId, commentText, commentCreator) => {
    const { addNewComment } = this.props;
    addNewComment(postId, commentText, commentCreator);
  };

  render() {
    const {
      postsList,
      usersList,
      currentSystemUser,
      openSelectUser,
      openCreatePostModal,
    } = this.props;

    return (
      <div className="postsMain">
        {!postsList.length ? (
          <div className="spinner">
            <img src="/img/spiner2.gif" alt="/" />
          </div>
        ) : (
          <>
            <div className="topPostBtns">
              <button
                type="button"
                className="selectUserBtn"
                onClick={() => openSelectUser()}
              >
                Select System User
              </button>
              <button
                type="button"
                className={cn(
                  "createNewPost",
                  !currentSystemUser._id && "disBtn"
                )}
                disabled={!currentSystemUser._id}
                onClick={() => openCreatePostModal()}
              >
                Create New Post
              </button>
            </div>
            <div className="postsListsSection">
              {postsList.map((post) => {
                return (
                  <PostItem
                    key={post._id}
                    postData={post}
                    usersList={usersList}
                    creatorData={usersList.find(
                      (user) => user._id === post.creator
                    )}
                    handleAddNewComment={(
                      postId,
                      commentText,
                      commentCreator
                    ) =>
                      this.handleAddNewComment(
                        postId,
                        commentText,
                        commentCreator
                      )
                    }
                  />
                );
              })}
            </div>
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    usersList: state.usersReducer.usersList,
    postsList: state.postsReducer.postsList,
    currentSystemUser: state.mainReducer.currentSystemUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUsers: () => dispatch(actions.getAllUsersAction()),
    getAllPosts: () => dispatch(actions.getAllPostsAction()),
    openSelectUser: () => dispatch(actions.openSelectUserModalAction()),
    openCreatePostModal: () => dispatch(actions.openCreatePostModal()),
    addNewComment: (postId, commentText, commentCreator) =>
      dispatch(
        actions.createNewCommentAction(postId, commentText, commentCreator)
      ),
  };
};

PostsMain.propTypes = {
  usersList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  postsList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  getAllUsers: PropTypes.func.isRequired,
  getAllPosts: PropTypes.func.isRequired,
  addNewComment: PropTypes.func.isRequired,
  openSelectUser: PropTypes.func.isRequired,
  openCreatePostModal: PropTypes.func.isRequired,
  currentSystemUser: PropTypes.shape({}).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostsMain);
