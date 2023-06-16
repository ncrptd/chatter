import { createPortal } from 'react-dom';
import { usePost, usePostDispatch } from '../../context/PostContext';
import { POST_ACTIONS } from '../../reducer/postReducer';
import './modal.css';
import { useState } from 'react';
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

  return createPortal(
    <>
      <div className=" modal-wrapper bg-slate-800" onClick={closeModal}></div>
      <div className="modal bg-slate-800 w-3/4 rounded-2xl shadow-lg shadow-slate-700 md:w-2/6 p-2">
        <div className="flex gap-2 p-4 w-full">
          <div>
            <div className="w-10 h-10 rounded-full bg-slate-100">
              {/* image  */}
            </div>
          </div>
          <textarea
            type="text"
            onChange={handleInputChange}
            value={editValue}
            placeholder="Something's cooking..."
            className="bg-inherit resize-none p-4 focus:outline-dotted"
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
            className=" bg-green-600 rounded-lg px-4 py-1  tracking-widest disabled:opacity-75 "
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
