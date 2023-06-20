import { createPortal } from 'react-dom';
import { usePost, usePostDispatch } from '../../context/PostContext';
import { POST_ACTIONS } from '../../reducer/postReducer';
import './modal.css';
import { useState } from 'react';
import { useUser } from '../../context/UserContext';
export default function EditPostModal({ post }) {
  const { editPostHandler } = usePost();

  const postDispatch = usePostDispatch();

  const [editValue, setEditValue] = useState(post.content);

  const portalEl = document.querySelector('.portal');
  const closeModal = (e) => {
    e.stopPropagation();
    postDispatch({ type: POST_ACTIONS.EDIT_POST, payload: { post: null } });
  };
  const handleInputChange = (e) => {
    let value = e.target.value;
    setEditValue(value);
  };

  const handleEditedPost = (e) => {
    editPostHandler(editValue, post._id);
    postDispatch({
      type: POST_ACTIONS.SHOW_OPTIONS,
      payload: { showOPtions: null },
    });
    closeModal(e);
  };
  const { state: userState } = useUser();
  const { allUsers } = userState;
  const user = allUsers.find((user) => user._id === post.userId);
  return createPortal(
    <>
      <div className=" modal-wrapper bg-slate-800" onClick={closeModal}></div>
      <div className="bg-slate-900 flex flex-col gap-2 text-center modal w-3/4 md:w-2/6 px-2 py-4 rounded-lg shadow-md shadow-slate-600">
        <div className="flex gap-2 p-4 w-full">
          <div>
            <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden">
              {/* image  */}
              <img
                src={
                  user?.profilePic ||
                  'https://res.cloudinary.com/donqbxlnc/image/upload/v1651664931/avatar-1577909_960_720_cl1ooh.png'
                }
                alt="profile"
                className="w-full h-full object-cover "
              />
            </div>
          </div>
          <textarea
            type="text"
            onChange={handleInputChange}
            value={editValue}
            placeholder="Something's cooking..."
            className="bg-inherit resize-none p-4 border border-slate-400 outline-none h-28"
          />
        </div>
        <div className="flex gap-4 justify-end px-4 pb-2">
          <button
            className=" bg-red-600 rounded-lg px-4 py-1  tracking-widest"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            className=" bg-pink-600 rounded-lg px-4 py-1  tracking-widest disabled:opacity-75 "
            onClick={handleEditedPost}
            disabled={editValue === ''}
          >
            Save
          </button>
        </div>
      </div>
    </>,
    portalEl
  );
}
