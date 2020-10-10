import * as actionsTypes from "./actionsTypes";
import axios from "axios";
import moment from "moment";

const getAllPostsCallback = (data) => ({
  type: actionsTypes.SET_ALL_POSTS_LIST,
  data,
});

const addNewCommentCallback = (data) => ({
  type: actionsTypes.ADD_NEW_COMMENT,
  data,
});

const deletepostCallback = (postId) => ({ type: actionsTypes.DELETE_POST, postId });

const createNewPostCallback = (data) => ({
  type: actionsTypes.CREATE_NEW_POST,
  data,
});

export const getAllPostsAction = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "https://blog-mongo-nadav.herokuapp.com/posts"
    );
    const { data = {} } = response;
    dispatch(getAllPostsCallback(data));
  } catch (error) {
    console.log(error);
  }
};

export const createNewCommentAction = (
  postId,
  commentText,
  commentAuthor
) => async (dispatch) => {
  try {
    await axios.put(
      `https://blog-mongo-nadav.herokuapp.com/posts/${postId}/2`,
      {
        comments: {
          autor: commentAuthor,
          text: commentText,
        },
      }
    );
    dispatch(addNewCommentCallback({ postId, commentText, commentAuthor }));
  } catch (error) {
    console.log(error);
  }
};

export const createNewPostAction = (postData) => async (dispatch) => {
  try {
    const response = await axios.post(
      "https://blog-mongo-nadav.herokuapp.com/posts",
      {
        title: postData.title,
        text: postData.text,
        creator: postData.creator,
        publishData: moment().format("DD/MM/YYYY"),
      }
    );
    const newPost = response.data.ops;
    dispatch(createNewPostCallback(newPost));
  } catch (error) {
    console.log(error);
  }
};

export const deletePostAction = (postId) => async (dispatch) => {
  try {
    await axios.delete(
      `https://blog-mongo-nadav.herokuapp.com/posts/${postId}`
    );
    dispatch(deletepostCallback(postId));
  } catch (error) {
    console.log(error);
  }
};
