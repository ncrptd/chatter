const POST_ACTIONS = {
  GET_POSTS: 'get-posts',
  FILTER_POSTS: 'filter-posts',
  ADD_POST: 'add-post',
};
const initialState = {
  posts: [],
  postsFilterBy: 'latest',
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
    default: {
      return state;
    }
  }
}

export { initialState, POST_ACTIONS, postReducer };
