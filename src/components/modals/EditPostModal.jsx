import { createPortal } from 'react-dom';
import { usePost, usePostDispatch } from '../../context/PostContext';
import { POST_ACTIONS } from '../../reducer/postReducer';
import './modal.css';
import { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { useRef } from 'react';
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dazl0yblg/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "chatter";

export default function EditPostModal({ post }) {

  const [editValue, setEditValue] = useState(post.content);
  const [image, setImage] = useState(post?.postPic || false);
  const imgRef = useRef();


  const { editPostHandler } = usePost();
  const postDispatch = usePostDispatch();

  const { state: userState } = useUser();
  const { allUsers } = userState;


  const portalEl = document.querySelector('.portal');

  const closeModal = (e) => {
    e.stopPropagation();
    postDispatch({ type: POST_ACTIONS.EDIT_POST, payload: { post: null } });
  };

  const handleInputChange = (e) => {
    let value = e.target.value;
    setEditValue(value,);
  };

  const handleEditedPost = async (e) => {
    e.preventDefault();

    const file = image;
    const formData = new FormData();

    if (file) {
      try {
        formData.append("file", file);
        formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
        let res = await fetch(CLOUDINARY_URL, {
          method: "POST",
          body: formData,
        });
        let data = await res.json();
        editPostHandler(editValue, data.url, post._id,);
        postDispatch({
          type: POST_ACTIONS.SHOW_OPTIONS,
          payload: { showOPtions: null },
        });
      } catch (error) {
        console.log('cloudinary api failled with error', error)

      }
    } else {
      editPostHandler(editValue, null, post._id,);
      postDispatch({
        type: POST_ACTIONS.SHOW_OPTIONS,
        payload: { showOPtions: null },
      });
    }

    closeModal(e);
  };


  const handleImageClick = (e) => {
    e.stopPropagation()
    imgRef.current.click();
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const removeImageHandler = (e) => {
    setImage(false)
  }
  const user = allUsers.find((user) => user._id === post.userId);


  return createPortal(
    <>
      <div className=" modal-wrapper bg-slate-800" onClick={closeModal}></div>
      <div className="bg-slate-900 flex flex-col gap-2 text-center modal w-3/4 md:w-2/6 px-2 py-4 rounded-lg shadow-md shadow-slate-600 ">
        <div className="flex gap-2 p-2 w-full ">
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
        {image && <div className=''>
          <div className='relative  overflow-hidden h-48 w-62 p-2 ml-12  '>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='absolute top-5 right-5 text-red-500 cursor-pointer ' onClick={removeImageHandler}><path fill="currentColor" d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12Z" /></svg>


            {typeof image === 'object' && <img src={URL.createObjectURL(image)} alt="" className='object-contain h-full w-full overflow-hidden rounded-md' />}
            {typeof image === 'string' && <img src={image} alt="" className='object-contain h-full w-full overflow-hidden rounded-md' />}
          </div>
        </div>}

        <div className="flex gap-4 justify-between items-center  p-2">
          <div
            className=""
            onClick={handleImageClick}
          >
            <input
              type="file"
              className="hidden"
              ref={imgRef}
              onChange={handleImageChange}
            />
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='cursor-pointer'><g fill="currentColor"><path d="M22 12.698c-.002 1.47-.013 2.718-.096 3.743c-.097 1.19-.296 2.184-.74 3.009a4.18 4.18 0 0 1-.73.983c-.833.833-1.893 1.21-3.237 1.39C15.884 22 14.2 22 12.053 22h-.106c-2.148 0-3.83 0-5.144-.177c-1.343-.18-2.404-.557-3.236-1.39c-.738-.738-1.12-1.656-1.322-2.795c-.2-1.12-.236-2.512-.243-4.241C2 12.957 2 12.492 2 12v-.054c0-2.148 0-3.83.177-5.144c.18-1.343.557-2.404 1.39-3.236c.832-.833 1.893-1.21 3.236-1.39c1.168-.157 2.67-.175 4.499-.177a.697.697 0 1 1 0 1.396c-1.855.002-3.234.018-4.313.163c-1.189.16-1.906.464-2.436.994S3.72 5.8 3.56 6.99C3.397 8.2 3.395 9.788 3.395 12v.784l.932-.814a2.14 2.14 0 0 1 2.922.097l3.99 3.99a1.86 1.86 0 0 0 2.385.207l.278-.195a2.79 2.79 0 0 1 3.471.209l2.633 2.37c.265-.557.423-1.288.507-2.32c.079-.972.09-2.152.091-3.63a.698.698 0 0 1 1.396 0Z" /><path fillRule="evenodd" d="M17.5 11c-2.121 0-3.182 0-3.841-.659C13 9.682 13 8.621 13 6.5c0-2.121 0-3.182.659-3.841C14.318 2 15.379 2 17.5 2c2.121 0 3.182 0 3.841.659C22 3.318 22 4.379 22 6.5c0 2.121 0 3.182-.659 3.841c-.659.659-1.72.659-3.841.659Zm.75-6.5a.75.75 0 0 0-1.5 0v1.25H15.5a.75.75 0 0 0 0 1.5h1.25V8.5a.75.75 0 0 0 1.5 0V7.25h1.25a.75.75 0 0 0 0-1.5h-1.25V4.5Z" clipRule="evenodd" /></g></svg>
          </div>
          <div className='flex gap-4'>
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
      </div>
    </>,
    portalEl
  );
}
