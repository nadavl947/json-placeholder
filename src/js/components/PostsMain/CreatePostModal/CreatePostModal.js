import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../store/actions/actions";
import { withTranslation } from "react-i18next";
import moment from "moment";

import "./CreatePostModal.scss";

const CreatePostModal = (props) => {
  const { t } = props;
  const systemUserData = useSelector(
    (state) => state.mainReducer.currentSystemUser
  );
  const [postTitle, setPostTitle] = useState("");
  const [postText, setPostText] = useState("");
  const isCreatePostVisible = useSelector(
    (state) => state.mainReducer.isCreatePostVisible
  );

  const dispatch = useDispatch();
  const createpostRef = useRef(null);

  useEffect(() => {
    const eventListener = (e) => {
      if (isCreatePostVisible) {
        if (!createpostRef.current.contains(e.target)) {
          dispatch(actions.openCreatePostModal());
        }
      }
    };
    document.addEventListener("mousedown", eventListener);
    return () => {
      document.removeEventListener("mousedown", eventListener);
    };
  }, [isCreatePostVisible, dispatch]);

  const onCreatePostSubmit = () => {
    const postData = {
      title: postTitle,
      text: postText,
      creator: systemUserData._id,
    };
    dispatch(actions.createNewPostAction(postData));
    dispatch(actions.openCreatePostModal());
  };

  return (
    <div className="createPostContainer">
      <div className="createPostContent" ref={createpostRef}>
        <div className="createPostBox">
          <div className="createPostBoxHeader">
            <img
              src={systemUserData.img || "/img/anonymous.png"}
              alt={systemUserData.name}
            />
            <div className="postCreatorDetails">
              <h3>{systemUserData.name}</h3>
              <p>{systemUserData.email}</p>
            </div>
            <h3>{moment().format("DD/MM/YYYY")}</h3>
          </div>
          <div className="createPostBoxInputs">
            <input
              type="text"
              value={postTitle}
              placeholder={t("createPostModal.postTitle_placeholder")}
              onChange={(e) => setPostTitle(e.target.value)}
            />
            <textarea
              type="text"
              value={postText}
              placeholder={t("createPostModal.postText_placeholder")}
              onChange={(e) => setPostText(e.target.value)}
            />
          </div>
          <div className="bottomBtns">
            <button
              type="button"
              className="resetBtn"
              onClick={() => {
                setPostTitle("");
                setPostText("");
              }}
            >
              {t("createPostModal.rest_btn")}
            </button>
            <button
              type="button"
              className="createBtn"
              onClick={() => onCreatePostSubmit()}
            >
              {t("createPostModal.create_btn")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withTranslation()(CreatePostModal);
