import { useContext } from 'react';
import { useReducer } from 'react';
import { createContext } from 'react';
import {
  AUTH_ACTIONS,
  authReducer,
  initialState,
} from '../reducer/authReducer';
import { useEffect } from 'react';
const AuthContext = createContext();
const AuthDispatchContext = createContext();

export default function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const checkLoggedIn = () => {
    const user = localStorage.getItem('user');
    if (user) {
      dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS });
    }
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ state }}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
}

const useAuth = () => useContext(AuthContext);
const useAuthDispatch = () => useContext(AuthDispatchContext);

export { useAuth, useAuthDispatch };
