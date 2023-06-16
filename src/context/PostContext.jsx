import { useEffect } from 'react';
import axios from 'axios';

import { createContext, useReducer, useContext } from 'react';
import { getAllPostService } from '../services/postServices';
import {
  initialState,
  POST_ACTIONS,
  postReducer,
} from '../reducer/postReducer';
import { getEncodedToken } from '../utils/encodedToken';
import { useUser } from './UserContext';

const PostContext = createContext();
const PostDispatchContext = createContext();

export function PostProvider({ children }) {
  const [state, dispatch] = useReducer(postReducer, initialState);

  const { state: userState } = useUser();
  const { userDetails } = userState;
  const getAllPostHandler = async () => {
    const res = await getAllPostService();
    const { data } = res;
    setTimeout(() => {
      dispatch({
        type: POST_ACTIONS.GET_POSTS,
        payload: { posts: data.posts },
      });
    }, 1000);
  };

  useEffect(() => {
    getAllPostHandler();
  }, []);

  const addPostHandler = async (content) => {
    try {
      const encodedToken = getEncodedToken();
      const config = {
        headers: { authorization: encodedToken },
      };
      console.log(userDetails.fullName);
      const body = {
        postData: {
          content,
          userId: userDetails._id,
          fullName: userDetails?.fullName,
        },
      };
      const res = await axios.post('/api/posts', body, config);
      console.log(res.data);
      dispatch({
        type: POST_ACTIONS.ADD_POST,
        payload: { posts: res.data.posts },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const editPostHandler = async (content, postId) => {
    try {
      const encodedToken = getEncodedToken();
      const config = {
        headers: { authorization: encodedToken },
      };
      const body = {
        postData: { content },
      };

      const res = await axios.post(`/api/posts/edit/${postId}`, body, config);
      const updatedPosts = res.data.posts;
      dispatch({
        type: POST_ACTIONS.ADD_POST,
        payload: { posts: updatedPosts },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deletePostHandler = async (postId) => {
    try {
      const encodedToken = getEncodedToken();
      const config = {
        headers: { authorization: encodedToken },
      };
      const res = await axios.delete(`/api/posts/${postId}`, config);
      console.log(res.data.posts);
      dispatch({
        type: POST_ACTIONS.ADD_POST,
        payload: { posts: res.data.posts },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <PostContext.Provider
      value={{ state, addPostHandler, editPostHandler, deletePostHandler }}
    >
      <PostDispatchContext.Provider value={dispatch}>
        {children}
      </PostDispatchContext.Provider>
    </PostContext.Provider>
  );
}

export const usePost = () => useContext(PostContext);
export const usePostDispatch = () => useContext(PostDispatchContext);
