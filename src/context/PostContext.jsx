import { createContext, useReducer, useContext } from 'react';
import { getAllPostService } from '../services/postServices';
import {
  initialState,
  POST_ACTIONS,
  postReducer,
} from '../reducer/postReducer';
import { useEffect } from 'react';

const PostContext = createContext();
const PostDispatchContext = createContext();

export function PostProvider({ children }) {
  const [state, dispatch] = useReducer(postReducer, initialState);
  const getPosts = async () => {
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
    getPosts();
  }, []);

  return (
    <PostContext.Provider value={{ state }}>
      <PostDispatchContext.Provider value={dispatch}>
        {children}
      </PostDispatchContext.Provider>
    </PostContext.Provider>
  );
}

export const usePost = () => useContext(PostContext);
export const usePostDispatch = () => useContext(PostDispatchContext);
