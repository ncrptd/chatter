import { createContext, useContext, useReducer } from 'react';
import userReducer, {
  USER_ACTIONS,
  initialState,
} from '../reducer/userReducer';
import { useEffect } from 'react';
import {
  getAllUserService,
  getUserPostsService,
  getUserService,
} from '../services/userServices';

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
      const res = await getAllUserService();
      dispatch({
        type: USER_ACTIONS.GET_ALL_USERS,
        payload: { users: res.data.users },
      });
    } catch (error) {
      console.log(`all users api failed with error ${error}`);
    }
  };
  const getProfileUserHandler = async (userId) => {
    console.log(userId);
    try {
      const res = await getUserService(userId);
      dispatch({
        type: USER_ACTIONS.SAVE_PROFILE_USER,
        payload: { userDetails: res.data.user },
      });
    } catch (error) {
      console.log(`api for profile user failed with error ${error}`);
    }
  };

  const getProfileUserPostsHandler = async (username) => {
    try {
      const res = await getUserPostsService(username);
      dispatch({
        type: USER_ACTIONS.ADD_PROFILE_USER_POSTS,
        payload: { posts: res.data.posts },
      });
    } catch (error) {
      console.log(`api for profile user posts failed with error ${error}`);
    }
  };

  useEffect(() => {
    getUserDetails();
    getAllUsers();
  }, []);
  return (
    <UserContext.Provider
      value={{ state, getProfileUserHandler, getProfileUserPostsHandler }}
    >
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}

const useUser = () => useContext(UserContext);
const useUserDispatch = () => useContext(UserDispatchContext);

export { useUser, useUserDispatch };
