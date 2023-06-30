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
import { addBookmarkService, getAllBookmarkService, removeBookMarkService } from '../services/bookmarkServices';

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
      if (res.status === 200) {

        const data = await res.data;

        const { user, followUser } = data;

        let updatedUserList = state.allUsers.map((dbUser) =>
          dbUser._id === user._id ? { ...dbUser, following: [...dbUser.following, followUser] } : dbUser
        );

        updatedUserList = updatedUserList.map((dbUser) => dbUser._id === followUser._id ? { ...dbUser, followers: [...dbUser.followers, user] } : dbUser);

        dispatch({ type: USER_ACTIONS.GET_ALL_USERS, payload: { users: updatedUserList } })
      }
    } catch (error) {
      console.log(error)
    }
  }
  const unFollowUserHandler = async (followUserId) => {
    try {
      const res = await unFollowUserService(followUserId);
      const data = await res.data;
      const { user, followUser } = data;
      let updatedUserList = state.allUsers.map((dbUser) => {
        return dbUser._id === user._id ? { ...dbUser, following: dbUser.following.filter((i) => i._id !== followUser._id) } : dbUser
      })
      updatedUserList = updatedUserList.map((dbUser) => dbUser._id === followUser._id ? { ...dbUser, followers: dbUser.followers.filter((i) => i._id !== user._id) } : dbUser);

      dispatch({ type: USER_ACTIONS.GET_ALL_USERS, payload: { users: updatedUserList } });
    } catch (error) {
      console.log('unfollow user api failed with error', error)
    }
  }

  const getAllBookmark = async () => {
    try {
      const res = await getAllBookmarkService();
      if (res.status === 200) {
        let data = await res.json();
        dispatch({ type: USER_ACTIONS.GET_ALL_BOOKMARKS, payload: { bookmarks: data.bookmarks } })
      }
    } catch (error) {
      console.log('all bookmark api failed with error', error)
    }
  }

  const addBookmarkHandler = async (postId) => {
    try {
      const res = await addBookmarkService(postId);

      if (res.status === 200) {
        const data = await res.data;
        const updatedUserDetails = { ...state.userDetails, bookmarks: data.bookmarks }
        dispatch({ type: USER_ACTIONS.ADD_BOOKMARK, payload: { userDetails: updatedUserDetails } })
      }
    } catch (error) {
      console.log('add bookmark api failed with error', error)

    }
  }

  const removeBookmarkHandler = async (postId) => {
    try {
      const res = await removeBookMarkService(postId);
      if (res.status === 200) {
        const data = await res.data;
        const updatedUserDetails = { ...state.userDetails, bookmarks: data.bookmarks }
        dispatch({ type: USER_ACTIONS.ADD_BOOKMARK, payload: { userDetails: updatedUserDetails } })
      }
    } catch (error) {
      console.log('add bookmark api failed with error', error)

    }
  }


  useEffect(() => {
    getUserDetails();
    getAllUsers();
    getAllBookmark();

  }, []);
  return (
    <UserContext.Provider
      value={{ state, editUserHandler, followUserHandler, unFollowUserHandler, getAllUsers, addBookmarkHandler, removeBookmarkHandler }}
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