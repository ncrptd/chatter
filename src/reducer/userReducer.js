const USER_ACTIONS = {
  SAVE_USER: 'save-user',
  GET_ALL_USERS: 'get-all-users',
  ADD_USER_POSTS: 'add-user-posts',
  OPEN_PROFILE_EDIT_MODAL: 'open-profile-edit-modal',
  ADD_BOOKMARK: 'add-bookmark',
  REMOVE_BOOKMARK: 'remove-bookmark',

};
const initialState = {
  userDetails: null,
  allUsers: [],
  profileUser: null,
  openProfileEditModal: false,
};
export default function userReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_ACTIONS.SAVE_USER: {
      return { ...state, userDetails: payload.userDetails };
    }
    case USER_ACTIONS.GET_ALL_USERS: {
      return { ...state, allUsers: payload.users };
    }
    case USER_ACTIONS.OPEN_PROFILE_EDIT_MODAL: {
      return { ...state, openProfileEditModal: payload.open };
    }
    case USER_ACTIONS.ADD_BOOKMARK: {
      return { ...state, userDetails: { ...state.userDetails, bookmarks: payload.bookmarks } }
    }
    case USER_ACTIONS.REMOVE_BOOKMARK: {
      return { ...state, userDetails: { ...state.userDetails, bookmarks: payload.bookmarks } }
    }
    default: {
      return state;
    }
  }
}

export { USER_ACTIONS, initialState };
