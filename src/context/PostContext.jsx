import { createContext, useReducer, useContext } from 'react';
import { getAllPostService } from '../services/postServices';
import {
  initialState,
  POST_ACTIONS,
  postReducer,
} from '../reducer/postReducer';
import { getEncodedToken } from '../utils/encodedToken';
import { useEffect } from 'react';
import axios from 'axios';

const PostContext = createContext();
const PostDispatchContext = createContext();

export function PostProvider({ children }) {
  const [state, dispatch] = useReducer(postReducer, initialState);
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
    const encodedToken = getEncodedToken();
    const config = {
      headers: { authorization: encodedToken },
    };
    const body = {
      postData: { content },
    };
    const res = await axios.post('/api/posts', body, config);
    dispatch({
      type: POST_ACTIONS.ADD_POST,
      payload: { posts: res.data.posts },
    });
  };
  return (
    <PostContext.Provider value={{ state, addPostHandler }}>
      <PostDispatchContext.Provider value={dispatch}>
        {children}
      </PostDispatchContext.Provider>
    </PostContext.Provider>
  );
}

export const usePost = () => useContext(PostContext);
export const usePostDispatch = () => useContext(PostDispatchContext);
