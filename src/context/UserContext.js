import { createContext, useContext, useReducer } from 'react';
import userReducer, {
  USER_ACTIONS,
  initialState,
} from '../reducer/userReducer';
import { useEffect } from 'react';
import {
  followUserService,
  getAllUserService,
  getUserService,
  unFollowUserService,
  userEditService,
} from '../services/userServices';
import { addBookmarkService, removeBookMarkService } from '../services/bookmarkServices';
import { toastError, toastSuccess } from '../alerts/alerts';

const UserContext = createContext();
const UserDispatchContext = createContext();

export default function UserProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const getUserDetails = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    try {
      if (user) {
        const res = await getUserService(user.userDetails._id);
        if (res.status === 200) {
          dispatch({ type: USER_ACTIONS.SAVE_USER, payload: { userDetails: res.data.user } })
        }
      }
    } catch (error) {
      toastError('Something went wrong please login again')
    }
  };
  const getAllUsers = async () => {
    try {
      const res = await getAllUserService();
      dispatch({
        type: USER_ACTIONS.GET_ALL_USERS,
        payload: { users: res.data.users },
      });
    } catch (error) {
      toastError('Something went wrong please login again')

    }
  };

  const editUserHandler = async (userData) => {
    try {
      const res = await userEditService(userData);
      const user = res.data.user;
      const updatedAllUsers = state.allUsers.map((dbUser) => dbUser._id === user._id ? user : dbUser);
      return dispatch({ type: USER_ACTIONS.GET_ALL_USERS, payload: { users: updatedAllUsers } });
    } catch (error) {
      toastError('Profile Edit failed')

    }
  }

  const followUserHandler = async (followUserId, setDisableFollow) => {
    setDisableFollow(true);
    try {
      const res = await followUserService(followUserId);
      if (res.status === 200) {

        const data = await res.data;

        const { user, followUser } = data;

        let updatedUserList = state.allUsers.map((dbUser) =>
          dbUser._id === user._id ? { ...dbUser, following: [...dbUser.following, followUser] } : dbUser
        );

        updatedUserList = updatedUserList.map((dbUser) => dbUser._id === followUser._id ? { ...dbUser, followers: [...dbUser.followers, user] } : dbUser);

        dispatch({ type: USER_ACTIONS.GET_ALL_USERS, payload: { users: updatedUserList } });
        setDisableFollow(false)
        toastSuccess(`Following ${followUser.fullName}`)
      }
    } catch (error) {
      toastError('Something went wrong')
    }
  }
  const unFollowUserHandler = async (followUserId, setDisableFollow) => {
    setDisableFollow(true);
    try {
      const res = await unFollowUserService(followUserId);
      if (res.status === 200) {
        const data = await res.data;
        const { user, followUser } = data;
        let updatedUserList = state.allUsers.map((dbUser) => {
          return dbUser._id === user._id ? { ...dbUser, following: dbUser.following.filter((i) => i._id !== followUser._id) } : dbUser
        })
        updatedUserList = updatedUserList.map((dbUser) => dbUser._id === followUser._id ? { ...dbUser, followers: dbUser.followers.filter((i) => i._id !== user._id) } : dbUser);

        dispatch({ type: USER_ACTIONS.GET_ALL_USERS, payload: { users: updatedUserList } });
        setDisableFollow(false)
        toastSuccess(`UnFollowed ${followUser.fullName}`)
      }
    } catch (error) {
      toastError('Something went wrong')
      console.log(error)
    }
  }


  const addBookmarkHandler = async (postId, setDisableBookmark) => {
    setDisableBookmark(true)
    try {
      const res = await addBookmarkService(postId);
      if (res.status === 200) {
        const data = await res.data;
        dispatch({ type: USER_ACTIONS.ADD_BOOKMARK, payload: { bookmarks: data.bookmarks } });
        setDisableBookmark(false)
      }
    } catch (error) {
      toastError('Something went wrong')

    }
  }

  const removeBookmarkHandler = async (postId, setDisableBookmark) => {
    setDisableBookmark(true);
    try {
      const res = await removeBookMarkService(postId);
      if (res.status === 200) {
        const data = await res.data;
        dispatch({ type: USER_ACTIONS.REMOVE_BOOKMARK, payload: { bookmarks: data.bookmarks } });
        setDisableBookmark(false)
        toastSuccess('Removed From Bookmarks')
      }
    } catch (error) {
      toastError('Something went wrong')
      console.log(error)
    }
  }


  useEffect(() => {
    getUserDetails();
    getAllUsers();

  }, []);
  return (
    <UserContext.Provider
      value={{ state, editUserHandler, followUserHandler, unFollowUserHandler, getAllUsers, addBookmarkHandler, removeBookmarkHandler, getUserDetails }}
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
