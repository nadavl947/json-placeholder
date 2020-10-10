import React from "react";
import PropTypes from "prop-types";

import "./CommentItem.scss";

const CommentItem = (props) => {
  const { creatorData, commentData } = props;

  return (
    <div className="commentItem">
      <div className="commentHeader">
        <img
          src={creatorData.img || "/img/anonymous.png"}
          alt={creatorData.name}
        />
        <h3>{creatorData.name}</h3>
      </div>
      <p>{commentData.text}</p>
    </div>
  );
};

CommentItem.propTypes = {
  commentData: PropTypes.shape({}).isRequired,
  creatorData: PropTypes.shape({}),
};

CommentItem.defaultProps = {
  creatorData: {
    img: "",
    name: "",
    _id: "",
    email: "",
  },
};

export default CommentItem;
