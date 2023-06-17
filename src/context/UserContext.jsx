import { createContext, useContext, useReducer } from 'react';
import userReducer, {
  USER_ACTIONS,
  initialState,
} from '../reducer/userReducer';
import { useEffect } from 'react';
import { getAllUserService } from '../services/userServices';

const UserContext = createContext();
const UserDispatchContext = createContext();

export default function UserProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const getUserDetails = () => {
    const user = localStorage.getItem('user');
    if (!user) return false;
    const { userDetails } = JSON.parse(user);
    dispatch({
      type: USER_ACTIONS.SAVE_USER,
      payload: { userDetails: userDetails },
    });
  };
  const getAllUsers = async () => {
    try {
      let res = await getAllUserService();
      dispatch({
        type: USER_ACTIONS.GET_ALL_USERS,
        payload: { users: res.data.users },
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserDetails();
    getAllUsers();
  }, []);
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
