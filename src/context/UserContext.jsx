import { createContext, useContext, useReducer } from 'react';
import userReducer, {
  USER_ACTIONS,
  initialState,
} from '../reducer/userReducer';
import { useEffect } from 'react';
import {
  followUserService,
  getAllUserService,
  unFollowUserService,
  userEditService,
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

  const editUserHandler = async (userData) => {
    try {
      const res = await userEditService(userData);
      const user = res.data.user;
      const updatedAllUsers = state.allUsers.map((dbUser) => dbUser._id === user._id ? user : dbUser);
      return dispatch({ type: USER_ACTIONS.GET_ALL_USERS, payload: { users: updatedAllUsers } });
    } catch (error) {
      console.log(`api for user edit failed with error ${error}`)

    }
  }

  const followUserHandler = async (followUserId) => {
    try {
      const res = await followUserService(followUserId);
      const data = await res.json();
      const user = data.user;
      const followUser = data.followUser;

      const userData = { following: [data.followUser], };
      editUserHandler(userData);
      const updatedAllUsers = state.allUsers.map((dbUser) => dbUser._id === followUser._id ? { ...dbUser, followers: [...dbUser.followers, user] } : dbUser);
      dispatch({ type: USER_ACTIONS.GET_ALL_USERS, payload: { users: updatedAllUsers } })

    } catch (error) {
      console.log('follow user api failed with error', error.response.data)
    }
  }
  const unFollowUserHandler = async (followUserId) => {
    try {
      const res = await unFollowUserService(followUserId);
      const data = await res.json();
      console.log(data)
    } catch (error) {
      console.log('follow user api failed with error', error)
    }
  }
  useEffect(() => {
    getUserDetails();
    getAllUsers();
  }, []);
  return (
    <UserContext.Provider
      value={{ state, editUserHandler, followUserHandler, unFollowUserHandler, getAllUsers }}
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
