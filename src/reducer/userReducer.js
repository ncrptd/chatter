const USER_ACTIONS = {
  SAVE_USER: 'save-user',
  GET_ALL_USERS: 'get-all-users',
};
const initialState = {
  userDetails: null,
  allUsers: [],
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
    default: {
      return state;
    }
  }
}

export { USER_ACTIONS, initialState };
