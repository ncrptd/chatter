
const AUTH_ACTIONS = {
  LOGIN_SUCCESS: 'login-success',
  LOGOUT: 'logout'
};

const initialState = {
  isLoggedIn: false,
};

function authReducer(state, action) {
  const { type } = action;
  switch (type) {
    case AUTH_ACTIONS.LOGIN_SUCCESS: {
      return { ...state, isLoggedIn: true };
    }
    case AUTH_ACTIONS.LOGOUT: {
      return { ...state, isLoggedIn: false }
    }
    default: {
      return state;
    }
  }
}

export { AUTH_ACTIONS, initialState, authReducer };
