const AUTH_ACTIONS = {
  LOGIN_SUCCESS: 'login-success',
};

const initialState = {
  isLoggedIn: false,
};

function authReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case AUTH_ACTIONS.LOGIN_SUCCESS: {
      return { ...state, isLoggedIn: true };
    }
    default: {
      return state;
    }
  }
}

export { AUTH_ACTIONS, initialState, authReducer };
