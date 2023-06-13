const USER_ACTIONS = {
  SAVE_USER: 'save-user',
};
const initialState = {
  userDetails: null,
};
export default function userReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_ACTIONS.SAVE_USER: {
      return { ...state, userDetails: payload.userDetails };
    }
    default: {
      return state;
    }
  }
}

export { USER_ACTIONS, initialState };
