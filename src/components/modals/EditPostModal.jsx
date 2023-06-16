import { createPortal } from 'react-dom';
import { usePostDispatch } from '../../context/PostContext';
import { POST_ACTIONS } from '../../reducer/postReducer';
import './modal.css';
import { useState } from 'react';
export default function EditPostModal({ post }) {
  const [editValue, setEditValue] = useState(post.content);

  const portalEl = document.querySelector('.portal');
  const postDispatch = usePostDispatch();

  const closeModal = (e) => {
    e.stopPropagation();
    postDispatch({ type: POST_ACTIONS.EDIT_POST, payload: { post: null } });
  };
  const handleInputChange = (e) => {
    let value = e.target.value;
    setEditValue(value);
  };
  return createPortal(
    <>
      <div className=" modal-wrapper" onClick={closeModal}></div>
      <div className="modal p-4  text-black">
        <input type="text" onChange={handleInputChange} value={editValue} />
        <button>Cancel</button>
      </div>
    </>,
    portalEl
  );
}
