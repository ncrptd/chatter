import React from 'react';
import CreatePost from '../components/CreatePost';
import PostList from '../components/PostList';
import { usePost, usePostDispatch } from '../context/PostContext';
import { POST_ACTIONS } from '../reducer/postReducer';
export default function Home() {
  const { state } = usePost();
  const { postsFilterBy } = state;
  const postDispatch = usePostDispatch();
  const handlePostsFilter = (filterValue) => {
    postDispatch({
      type: POST_ACTIONS.FILTER_POSTS,
      payload: { filterBy: filterValue },
    });
  };

  return (
    <section className=" bg-slate-900 h-screen overflow-auto home">
      <h1 className="text-center p-2 font-semibold bg-gray-800 border-x border-slate-500">
        Home
      </h1>

      <div className="container mx-auto  border border-slate-500 ">
        <CreatePost />
      </div>
      <div className="flex justify-around items-center bg-gray-800 border-x border-b border-slate-500 p-2 font-semibold text-center">
        <button
          className={`flex gap-2 items-center  hover:text-red-400 ${
            postsFilterBy === 'latest' ? 'text-red-400 ' : null
          }`}
          onClick={() => {
            handlePostsFilter('latest');
          }}
        >
          Latest{' '}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 36 36"
          >
            <path
              fill="currentColor"
              d="m34.11 24.49l-3.92-6.62l3.88-6.35a1 1 0 0 0-.85-1.52H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h31.25a1 1 0 0 0 .86-1.51Zm-23.6-3.31H9.39l-3.26-4.34v4.35H5V15h1.13l3.27 4.35V15h1.12ZM16.84 16h-3.53v1.49h3.2v1h-3.2v1.61h3.53v1h-4.66V15h4.65Zm8.29 5.16H24l-1.55-4.59l-1.55 4.61h-1.12l-2-6.18H19l1.32 4.43L21.84 15h1.22l1.46 4.43L25.85 15h1.23Z"
              className="clr-i-solid clr-i-solid-path-1"
            />
            <path fill="none" d="M0 0h36v36H0z" />
          </svg>
        </button>
        <button
          className={`flex gap-2 items-center  hover:text-red-400 ${
            postsFilterBy === 'trending' ? 'text-red-400 ' : null
          }`}
          onClick={() => {
            handlePostsFilter('trending');
          }}
        >
          Trending{' '}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M1.414 16.432L0 15.018l7.071-7.071l6.364 6.364l4.243-4.243l-1.743-1.742l6.692-1.793l-1.793 6.692l-1.742-1.742l-5.657 5.656l-6.364-6.364l-5.657 5.657Z"
            />
          </svg>
        </button>
      </div>
      <PostList />
    </section>
  );
}
