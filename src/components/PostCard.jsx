import * as dayjs from 'dayjs';
import { formatDate } from '../utils/formatDate';
import { likePostService } from '../services/postServices';
import { useUser } from '../context/UserContext';
import { usePost, usePostDispatch } from '../context/PostContext';
import { POST_ACTIONS } from '../reducer/postReducer';
let relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

export default function PostCard({ post }) {
  const { state: userState } = useUser();
  const { userDetails } = userState;
  const postDispatch = usePostDispatch();
  const liked = post.likes.likedBy.includes(userDetails);
  const likeHandler = async () => {
    let res = await likePostService(post);
    console.log(res.data.posts);
    postDispatch({
      type: POST_ACTIONS.ADD_POST,
      payload: { posts: res.data.posts },
    });
  };
  return (
    <div className="p-4 w-full min-h-max items-center border-x border-b border-slate-500">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1 ">
          <div className="w-10 h-10 rounded-full bg-slate-100">
            {/* <img
              src={post?.postImage}
              alt="user-profile"
              className="w-full h-full object-cover "
            /> */}
          </div>
          <p className="text-semibold">{post?.fullName}</p>
          <p className="font-thin  text-sm text-slate-400 ">
            @{post?.username} ◦
          </p>
          <p className="font-thin text-sm text-slate-400">
            {formatDate(post?.createdAt)}
          </p>
        </div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="cursor-pointer"
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
        </div>
      </div>
      <p className="mt-4 text-sm">{post?.content}</p>
      <div className="flex gap-4 mt-4 font-thin text-slate-200 ">
        {/* like  */}

        <button className="flex gap-2" onClick={likeHandler}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className={`text-gray-500 ${liked && 'text-red-500'}`}
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

        {/* comment  */}
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="cursor-pointer"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              d="M19 4H5a2 2 0 0 0-2 2v15l3.467-2.6a2 2 0 0 1 1.2-.4H19a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"
            />
          </svg>
        </button>

        {/* bookmark
         */}
        <button>
          {' '}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className=" cursor-pointer"
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
    </div>
  );
}
