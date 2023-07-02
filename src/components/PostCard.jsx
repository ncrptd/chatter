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
import { toastError } from '../alerts/alerts';

let relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);


export default function PostCard({ post, disableLike, setDisableLike, disableBookmark, setDisableBookmark }) {

  const { state: userState, addBookmarkHandler, removeBookmarkHandler } = useUser();
  const { userDetails, allUsers } = userState;

  const { state: postState } = usePost();
  const { showOptions } = postState;
  const postDispatch = usePostDispatch();
  const liked = post?.likes.likedBy.find((user) => user?._id === userDetails?._id);
  const isUserPost = post?.userId === userDetails?._id;
  const user = allUsers.find(({ _id }) => _id === post.userId);
  const optionsRef = useRef();
  const inBookmark = userDetails?.bookmarks?.some((bookmark) => bookmark._id === post?._id);

  const navigate = useNavigate();

  const likeHandler = async () => {
    setDisableLike(true);
    try {
      if (liked) {
        let res = await dislikePostService(post);
        if (res.status === 201) {
          postDispatch({
            type: POST_ACTIONS.ADD_POST,
            payload: { posts: res.data.posts },
          });
          setDisableLike(false);
        }
      } else {
        let res = await likePostService(post);
        if (res.status === 201) {
          postDispatch({
            type: POST_ACTIONS.ADD_POST,
            payload: { posts: res.data.posts },
          });
          setDisableLike(false)
        }
      }
    } catch (error) {
      toastError('Something went wrong')
      console.log('error', error)
      setDisableLike(false)

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
      addBookmarkHandler(post?._id, setDisableBookmark);
    } else {
      removeBookmarkHandler(post?._id, setDisableBookmark)
    }
  }
  return (
    <div className="p-4 w-full h-fit items-center border-x border-b border-slate-500 break-words ">
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
            <p className="text-semibold mr-2 clip">{user?.fullName} <span className="font-thin  text-sm text-slate-400 clip"> @{user?.username}</span></p>

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
      <div className='p-4 '>
        <p className="text-sm">{post?.content}</p>
        {post?.postPic && <div className='overflow-hidden mx-auto mt-4 md:h-96 '>
          <img src={post?.postPic} alt="post-pic" className='w-full h-full object-contain rounded-2xl' />
        </div>}

      </div>
      <div className="flex gap-4 font-thin text-slate-200 ">
        {/* like  */}

        <button className="flex gap-2" disabled={disableLike} onClick={likeHandler}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            className={`text-gray-500 md:hover:text-red-500 ${liked && 'text-red-500 '
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
        <button disabled={disableBookmark} onClick={handleBookmark} >
          {' '}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M5 21V5q0-.825.588-1.413T7 3h10q.825 0 1.413.588T19 5v16l-7-3l-7 3Z" className={`text-gray-500 ${inBookmark ? 'text-green-400 ' : 'hover:text-red-500'}`} /></svg>

        </button>
      </div>
      {post.length < 1 && <p>No posts</p>}
    </div>
  );
}
