import { useContext } from 'react';
import { useReducer } from 'react';
import { createContext } from 'react';
import { authReducer, initialState } from '../reducer/authReducer';
const AuthContext = createContext();
const AuthDispatchContext = createContext();

export default function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

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
