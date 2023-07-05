import React, { useState } from 'react';
import { usePost } from '../context/PostContext';
import { useUser } from '../context/UserContext';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toastError, toastPromise } from '../alerts/alerts';
import { readMedia } from '../utils/readmedia';

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dazl0yblg/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "chatter";

export default function CreatePost() {

  const [content, setContent] = useState('');

  const [image, setImage] = useState(null);

  const imgRef = useRef();

  const { addPostHandler } = usePost();

  const { state: userState } = useUser();

  const { userDetails } = userState;

  const navigate = useNavigate();

  const handleContentData = (e) => {
    const value = e.target.value;
    setContent(value);
  };

  const handleImageClick = () => {
    imgRef.current.click();
  };
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (Math.round(file?.size / 1024000) > 4) {
        return toastError('Image size cannot be more than 4 mb')
      } else {
        const url = await readMedia(file);
        setImage(url)
      }
    }

  }

  const removeImageHandler = () => {
    setImage(null)
  }
  const handleAddPost = async (e) => {
    e.preventDefault();
    let postPic = null;
    const file = image;
    const formData = new FormData();

    if (file) {
      try {
        formData.append("file", file);
        formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

        let res = await toastPromise(fetch(CLOUDINARY_URL, {
          method: "POST",
          body: formData,
        }), 'Creating Post', 'Post created Successfully', 'Post failed');
        if (res.status === 200) {
          let data = await res.json();
          postPic = data.url;
          ;
          addPostHandler(content, postPic);
          removeImageHandler();
          return setContent('');
        }
      } catch (error) {
        console.log('cloudinary api failed with error', error);
      }
    }
    toastPromise(addPostHandler(content), 'loading', 'Post created Successfully', 'Post failed');
    return setContent('');
  }

  const handleProfileClick = (e) => {
    e.preventDefault();
    navigate(`/profile/${userDetails?._id}`)
  }
  return (
    <div className="flex px-4 pt-8 pb-4 gap-4">
      <div className='w-10 h-10 rounded-full bg-slate-700 overflow-hidden cursor-pointer' onClick={handleProfileClick}>
        {userDetails?.profilePic && <img src={userDetails?.profilePic} alt="logged in user profile" className='h-full w-full object-cover' />}
      </div>
      <form className="flex flex-col w-full gap-6 " onSubmit={handleAddPost}>
        <input
          type="text"
          placeholder="What's happening ?"
          className="border-0 outline-0 bg-inherit  "
          value={content}
          onChange={handleContentData}
        />
        {image && <div className='relative overflow-hidden rounded-2xl w-3/4 h-96 bg-gray-800 mx-auto '>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='absolute top-3 right-3 cursor-pointer bg-gray-400 rounded-full p-1' onClick={removeImageHandler}>
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M20 20L4 4m16 0L4 20" /></svg>

          <img src={image} alt="" className='w-full h-full object-cover rounded-2xl' />
        </div>}
        <div className="flex w-3/4 mx-auto gap-2 items-center justify-end">
          <div className='' onClick={handleImageClick}>
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
            className="bg-pink-600 rounded-full px-6 py-1  place-self-end tracking-widest disabled:bg-gray-300 disabled:text-black "
            type="submit" disabled={content === '' ? true : false}
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
}

