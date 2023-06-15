import { usePost, usePostDispatch } from '../../context/PostContext';
import { POST_ACTIONS } from '../../reducer/postReducer';
import EditPostModal from './EditPostModal';

export default function PostOptionsModal({ post }) {
  const { state } = usePost();
  const { editPost } = state;

  const postDispatch = usePostDispatch();

  const handleEdit = () => {
    postDispatch({ type: POST_ACTIONS.EDIT_POST, payload: { post: post } });
  };
  return (
    <div className="bg-slate-700 rounded-lg p-4 text-white text-sm shadow-2xl">
      <button
        className="flex gap-1 justify-center items-center hover:text-pink-500"
        onClick={handleEdit}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="m19.3 8.925l-4.25-4.2l1.4-1.4q.575-.575 1.413-.575t1.412.575l1.4 1.4q.575.575.6 1.388t-.55 1.387L19.3 8.925ZM17.85 10.4L7.25 21H3v-4.25l10.6-10.6l4.25 4.25Z"
          />
        </svg>
        <span>Edit</span>
      </button>
      <button className="flex gap-1 justify-center items-center mt-3 hover:text-pink-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12Z"
          />
        </svg>
        <span>Delete</span>
      </button>
      {editPost && <EditPostModal post={post} />}
    </div>
  );
}
