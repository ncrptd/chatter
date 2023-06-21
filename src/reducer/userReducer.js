const USER_ACTIONS = {
  SAVE_USER: 'save-user',
  SAVE_PROFILE_USER: 'save-profile-user',
  GET_ALL_USERS: 'get-all-users',
  ADD_USER_POSTS: 'add-user-posts',
  OPEN_PROFILE_EDIT_MODAL: 'open-profile-edit-modal',
};
const initialState = {
  userDetails: null,
  allUsers: [],
  profileUser: null,
  profileUserPosts: null,
  openProfileEditModal: false,
};
export default function userReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_ACTIONS.SAVE_USER: {
      return { ...state, userDetails: payload.userDetails };
    }
    case USER_ACTIONS.SAVE_PROFILE_USER: {
      return { ...state, profileUser: payload.userDetails };
    }
    case USER_ACTIONS.GET_ALL_USERS: {
      return { ...state, allUsers: payload.users };
    }
    case USER_ACTIONS.OPEN_PROFILE_EDIT_MODAL: {
      return { ...state, openProfileEditModal: payload.open };
    }
    default: {
      return state;
    }
  }
}

export { USER_ACTIONS, initialState };
