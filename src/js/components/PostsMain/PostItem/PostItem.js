import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import cn from "classnames";
import { withTranslation } from "react-i18next";
import * as actions from "../../../store/actions/actions";

import CommentItem from "../CommentItem/CommentItem";

import "./PostItem.scss";

const PostItem = (props) => {
  const { postData, creatorData, usersList, handleAddNewComment, t } = props;

  const [newCommentValue, setNewCommentValue] = useState("");
  const currentSystemUser = useSelector(
    (state) => state.mainReducer.currentSystemUser
  );

  const dispatch = useDispatch();

  const onInputFocus = () => {
    if (!currentSystemUser._id) {
      dispatch(actions.openSelectUserModalAction());
    }
  };

  return (
    <div className="postItem">
      {postData.creator === currentSystemUser._id ? (
        <div className="deletePost">
          <button
            className="deleteBtn"
            type="button"
            onClick={() => dispatch(actions.deletePostAction(postData._id))}
          >
            <i className="fa fa-trash" />
          </button>
        </div>
      ) : null}
      <div className="postHeader">
        <img
          src={creatorData.img || "/img/anonymous.png"}
          alt={creatorData.name}
        />
        <div className="creatorDetails">
          <h3>{creatorData.name}</h3>
          <p>{creatorData.email}</p>
        </div>
        <h3>{postData.publishData}</h3>
      </div>
      <div className="postsContent">
        <h3>{postData.title}</h3>
        <p>{postData.text}</p>
      </div>
      <div className="divider" />
      <div className="commentsSection">
        <div className="addComent">
          <textarea
            type="text"
            value={newCommentValue}
            onChange={(e) => setNewCommentValue(e.target.value)}
            placeholder={t("postItem.addComment_lable")}
            onFocus={() => onInputFocus()}
          />
          <button
            type="button"
            className={cn("commentBtn", newCommentValue && "commentBrnVisible")}
            onClick={() => {
              handleAddNewComment(
                postData._id,
                newCommentValue,
                currentSystemUser._id
              );
              setNewCommentValue("");
            }}
          >
            {t("postItem.comment_btn")}
          </button>
          {postData.comments.map((comment, index) => {
            return (
              <CommentItem
                key={index}
                commentData={comment}
                creatorData={usersList.find(
                  (user) => user._id === comment.autor
                )}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

PostItem.propTypes = {
  postData: PropTypes.shape({}).isRequired,
  creatorData: PropTypes.shape({}),
  usersList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  handleAddNewComment: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

PostItem.defaultProps = {
  creatorData: {
    img: "",
    name: "",
    _id: "",
    email: "",
  },
  newCommentText: "",
};

export default withTranslation()(PostItem);
