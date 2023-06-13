import * as dayjs from 'dayjs';
import { formatDate } from '../utils/formatDate';
var relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

export default function PostCard({ post }) {
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
        {/* like  */}

        <button className="flex gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 48 48"
            className="text-red-400 cursor-pointer"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 8C8.925 8 4 12.925 4 19c0 11 13 21 20 23.326C31 40 44 30 44 19c0-6.075-4.925-11-11-11c-3.72 0-7.01 1.847-9 4.674A10.987 10.987 0 0 0 15 8Z"
            />
          </svg>
          <p className="text-white">
            {post.likes.likeCount >= 1 ? post.likes.likeCount : null}
          </p>
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
            className="text-green-400 cursor-pointer"
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
