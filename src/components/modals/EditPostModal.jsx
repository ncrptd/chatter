import { createPortal } from 'react-dom';
import { usePost, usePostDispatch } from '../../context/PostContext';
import { POST_ACTIONS } from '../../reducer/postReducer';
import './modal.css';
import { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { useRef } from 'react';
export default function EditPostModal({ post }) {
  const [editValue, setEditValue] = useState(post.content);
  const [image, setImage] = useState(null);

  const imgRef = useRef();

  const { editPostHandler } = usePost();
  const { state: userState } = useUser();
  const { allUsers } = userState;

  const postDispatch = usePostDispatch();


  const portalEl = document.querySelector('.portal');
  const closeModal = (e) => {
    e.stopPropagation();
    postDispatch({ type: POST_ACTIONS.EDIT_POST, payload: { post: null } });
  };
  const handleInputChange = (e) => {
    let value = e.target.value;
    setEditValue(value,);
  };

  const handleEditedPost = (e) => {
    editPostHandler(editValue, 'https://plus.unsplash.com/premium_photo-1663840278040-e7853b6b4ee5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80', post._id,);
    postDispatch({
      type: POST_ACTIONS.SHOW_OPTIONS,
      payload: { showOPtions: null },
    });
    closeModal(e);
  };

  const user = allUsers.find((user) => user._id === post.userId);

  const handleImageClick = () => {
    imgRef.current.click();
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };
  const removeImageHandler = () => {
    setImage(null)
  }
  return createPortal(
    <>
      <div className=" modal-wrapper bg-slate-800" onClick={closeModal}></div>
      <div className="bg-slate-900 flex flex-col gap-2 text-center modal w-3/4 md:w-2/6 px-2 py-4 rounded-lg shadow-md shadow-slate-600 ">
        <div className="flex gap-2 p-4 w-full ">
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
        {post?.postPic && <div className='relative  overflow-hidden mx-auto h-40 w-full p-4'>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='absolute top-5 right-5 text-red-500 cursor-pointer ' onClick={removeImageHandler}>

            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M20 20L4 4m16 0L4 20" /></svg>

          <img src={post?.postPic ? post?.postPic : URL.createObjectURL(image)} alt="" className='object-contain h-full w-full mx-auto' />
        </div>}

        <div className="flex gap-4 justify-end px-4 pb-2">
          <div className='flex justify-center items-center' onClick={handleImageClick}>
            <input
              type="file"
              className="hidden"
              ref={imgRef}
              onChange={handleImageChange}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className='hover:cursor-pointer hover:text-pink-500'
            >
              <path
                fill="currentColor"
                d="M5 21q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.588 1.413T19 21H5Zm0-2h14V5H5v14Zm1-2h12l-3.75-5l-3 4L9 13l-3 4Zm-1 2V5v14Z"
              />
            </svg>
          </div>
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
