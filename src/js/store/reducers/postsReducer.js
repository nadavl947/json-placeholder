import * as actionsTypes from "../actions/actionsTypes";

const initialState = {
  postsList: [],
};

const setAllPostsState = (state, action) => {
  const { data } = action;

  return {
    ...state,
    postsList: data.reverse(),
  };
};

const setNewCommentState = (state, action) => {
  const { data } = action;
  const { postId, commentText, commentAuthor } = data;
  const { postsList } = state;

  const newComment = {
    autor: commentAuthor,
    text: commentText,
  };
  const postsListCopy = [...postsList];
  const postIndex = postsListCopy.findIndex((post) => post._id === postId);

  let postCopy = { ...postsListCopy[postIndex] };
  let postCommentsCopy = [...postCopy.comments, newComment];

  postCopy.comments = postCommentsCopy;
  postsListCopy[postIndex] = postCopy;

  return {
    ...state,
    postsList: postsListCopy,
  };
};

const createNewPostState = (state, action) => {
  const { data } = action;
  const { postsList } = state;

  return {
    ...state,
    postsList: [data[0], ...postsList],
  };
};

const deletePostDeomState = (state, action) => {
  const { postId } = action;
  const { postsList } = state;

  const newPostsList = postsList.filter((post) => post._id !== postId);

  return {
    ...state,
    postsList: newPostsList,
  };
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.SET_ALL_POSTS_LIST:
      return setAllPostsState(state, action);
    case actionsTypes.ADD_NEW_COMMENT:
      return setNewCommentState(state, action);
    case actionsTypes.CREATE_NEW_POST:
      return createNewPostState(state, action);
    case actionsTypes.DELETE_POST:
      return deletePostDeomState(state, action);
    default:
      return state;
  }
};

export default postsReducer;
