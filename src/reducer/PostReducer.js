const POST_ACTIONS = {
  GET_POSTS: 'get-posts',
  FILTER_POSTS: 'filter-posts',
  ADD_POST: 'add-post',
  SHOW_OPTIONS: 'show-options',
  EDIT_POST: 'edit-post',
};
const initialState = {
  posts: null,
  postsFilterBy: 'latest',
  showOptions: null,
  editPost: null,
};

function postReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case POST_ACTIONS.GET_POSTS: {
      return { ...state, posts: payload.posts };
    }
    case POST_ACTIONS.FILTER_POSTS: {
      return { ...state, postsFilterBy: payload.filterBy };
    }
    case POST_ACTIONS.ADD_POST: {
      return { ...state, posts: payload.posts };
    }
    case POST_ACTIONS.EDIT_POST: {
      return { ...state, editPost: payload.post };
    }
    case POST_ACTIONS.SHOW_OPTIONS: {
      return { ...state, showOptions: payload.postId };
    }
    default: {
      return state;
    }
  }
}

export { initialState, POST_ACTIONS, postReducer };
