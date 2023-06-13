import { createContext, useContext, useReducer } from 'react';
import userReducer, { initialState } from '../reducer/userReducer';

const UserContext = createContext();
const UserDispatchContext = createContext();

export default function UserProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, initialState);
  return (
    <UserContext.Provider value={{ state }}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}

const useUser = () => useContext(UserContext);
const useUserDispatch = () => useContext(UserDispatchContext);

export { useUser, useUserDispatch };
