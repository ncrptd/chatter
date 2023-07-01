import React, { useState } from 'react';
import { usePost } from '../context/PostContext';
import { useUser } from '../context/UserContext';
import { useRef } from 'react';
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dazl0yblg/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "chatter";

export default function CreatePost() {

  const [content, setContent] = useState('');

  const [image, setImage] = useState(null);

  const imgRef = useRef();

  const { addPostHandler } = usePost();

  const { state: userState } = useUser();

  const { userDetails } = userState;

  const handleContentData = (e) => {
    const value = e.target.value;
    setContent(value);
  };


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
  const handleAddPost = async (e) => {
    e.preventDefault();
    let postPic = null;

    const file = image;
    const formData = new FormData();

    if (file) {
      try {
        formData.append("file", file);
        formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
        console.log(formData)
        let res = await fetch(CLOUDINARY_URL, {
          method: "POST",
          body: formData,
        });
        let data = await res.json();
        postPic = data.url
        addPostHandler(content, postPic);
        setContent('');
        return removeImageHandler()
      } catch (error) {
        console.log('cloudinary api failled with error', error)
      }
    }
    addPostHandler(content);
    return setContent('');
  }


  return (
    <div className="flex px-4 pt-8 pb-4 gap-4">
      <div className='w-10 h-10 rounded-full bg-slate-700 overflow-hidden '>
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
        {image && <div className='relative border overflow-hidden mx-auto h-80'>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='absolute top-3 right-3 text-black cursor-pointer hover:text-pink-500' onClick={removeImageHandler}>

            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M20 20L4 4m16 0L4 20" /></svg>

          <img src={URL.createObjectURL(image)} alt="" className='object-contain h-full w-full' />
        </div>}
        <div className="flex items-center justify-end gap-4">
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
            className="bg-pink-600 rounded-full px-6 py-1  place-self-end tracking-widest disabled:bg-gray-300 disabled:text-black"
            type="submit" disabled={content === '' ? true : false}
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
}

