import { useContext } from 'react';
import { useReducer } from 'react';
import { createContext } from 'react';
import {
  AUTH_ACTIONS,
  authReducer,
  initialState,
} from '../reducer/authReducer';
import { useEffect } from 'react';
import { loginService } from '../services/authService';

const AuthContext = createContext();
const AuthDispatchContext = createContext();

export default function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);


  const checkLoggedIn = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    try {
      const res = await loginService(user.userDetails.username, user.userDetails.password);
      if (res.status === 200) {
        dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, })
      }
    } catch (error) {
      localStorage.clear('user');
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
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
