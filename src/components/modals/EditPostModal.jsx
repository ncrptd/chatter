import { createPortal } from 'react-dom';
import { usePostDispatch } from '../../context/PostContext';
import { POST_ACTIONS } from '../../reducer/postReducer';
import './modal.css';
export default function EditPostModal({ post }) {
  const portalEl = document.querySelector('.portal');
  const postDispatch = usePostDispatch();

  const closeModal = (e) => {
    e.stopPropagation();
    postDispatch({ type: POST_ACTIONS.EDIT_POST, payload: { post: null } });
    postDispatch({
      type: POST_ACTIONS.SHOW_OPTIONS,
      payload: { postId: 'hello' },
    });
  };
  return createPortal(
    <>
      <div className=" modal-wrapper" onClick={closeModal}></div>
      <div className="modal">
        <input type="text" />
        <button>Cancel</button>
      </div>
    </>,
    portalEl
  );
}
