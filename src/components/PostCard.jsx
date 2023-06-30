import * as dayjs from 'dayjs';
import { formatDate } from '../utils/formatDate';
import { likePostService, dislikePostService } from '../services/postServices';
import { useUser } from '../context/UserContext';
import { usePost, usePostDispatch } from '../context/PostContext';
import { POST_ACTIONS } from '../reducer/postReducer';
import PostOptionsModal from './modals/PostOptionsModal';
import { useRef } from 'react';
import { useOutsideClick } from '../customHooks/useOutsideClick';
import { useNavigate } from 'react-router-dom';
let relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

export default function PostCard({ post }) {
  const { state: userState, addBookmarkHandler, removeBookmarkHandler } = useUser();
  const { userDetails, allUsers } = userState;

  const { state: postState } = usePost();
  const { showOptions } = postState;
  const postDispatch = usePostDispatch();

  const liked = post?.likes.likedBy.find((user) => user?._id === userDetails?._id);
  const isUserPost = post?.userId === userDetails?._id;
  const user = allUsers.find(({ _id }) => _id === post.userId);
  const optionsRef = useRef();
  const inBookmark = userDetails?.bookmarks.some((bookmark) => bookmark._id === post?._id)
  const navigate = useNavigate();

  const likeHandler = async () => {
    try {
      if (liked) {
        let res = await dislikePostService(post);
        postDispatch({
          type: POST_ACTIONS.ADD_POST,
          payload: { posts: res.data.posts },
        });
      } else {
        let res = await likePostService(post);

        postDispatch({
          type: POST_ACTIONS.ADD_POST,
          payload: { posts: res.data.posts },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const optionsHandler = (e) => {
    e.preventDefault();
    postDispatch({
      type: POST_ACTIONS.SHOW_OPTIONS,
      payload: { postId: post._id },
    });
  };
  useOutsideClick(optionsRef, postDispatch, {
    type: POST_ACTIONS.SHOW_OPTIONS,
    payload: { postId: null },
  });

  const handleProfileNavigation = () => {
    navigate(`/profile/${post?.userId}`);
  };


  const handleBookmark = () => {
    if (!inBookmark) {
      addBookmarkHandler(post?._id);
    } else {
      removeBookmarkHandler(post?.id)
    }
  }
  return (
    <div className="p-4 w-full min-h-max items-center border-x border-b border-slate-500 break-words">
      <div className="flex justify-between items-center ">
        <div
          className="flex items-center gap-4 cursor-pointer"
          onClick={handleProfileNavigation}
        >
          <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden">
            <img
              src={user?.profilePic}
              alt="user-profile"
              className="w-full h-full object-cover "
            />
          </div>
          <div className=''>
            <p className="text-semibold mr-2">{user?.fullName} <span className="font-thin  text-sm text-slate-400 "> @{user?.username}</span></p>

            <p className="font-thin text-sm text-slate-400">
              {formatDate(post?.createdAt)}
            </p>
          </div>
        </div>
        {isUserPost && (
          <div onClick={optionsHandler} className="relative cursor-pointer">
            {/* options */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="hover:text-pink-500 transition duration-150 hover:ease-in-out"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0"
              />
            </svg>
            {showOptions === post?._id && (
              <div className="absolute top-0 right-0 ">
                <PostOptionsModal post={post} ref={optionsRef} />
              </div>
            )}
          </div>
        )}
      </div>
      <p className="mt-4 text-sm ">{post?.content}</p>
      <div className="flex gap-4 mt-4 font-thin text-slate-200 ">
        {/* like  */}

        <button className="flex gap-2 " onClick={likeHandler}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            className={`text-gray-500 md:hover:text-red-500 transition duration-150 hover:ease-in-out ${liked && 'text-red-500 '
              }`}
          >
            <path
              fill="currentColor"
              d="m12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35Z"
            />
          </svg>

          <p className="text-white">
            {post.likes.likeCount >= 1 ? post.likes.likeCount : null}
          </p>
        </button>

        {/* bookmark
         */}
        <button onClick={handleBookmark} >
          {' '}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className={`${inBookmark ? 'text-green-400' : ''} md:hover:text-green-500  transition duration-150 hover:ease-in-out `}
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              d="M17 3H7a2 2 0 0 0-2 2v15.138a.5.5 0 0 0 .748.434l5.26-3.005a2 2 0 0 1 1.984 0l5.26 3.006a.5.5 0 0 0 .748-.435V5a2 2 0 0 0-2-2z"
            />
          </svg>
        </button>
      </div>
      {post.length < 1 && <p>No posts</p>}
    </div>
  );
}
