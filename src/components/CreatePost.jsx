import React, { useState } from 'react';
import { usePost } from '../context/PostContext';
export default function CreatePost() {
  const [content, setContent] = useState('');

  const { addPostHandler } = usePost();

  const handleContentData = (e) => {
    const value = e.target.value;
    setContent(value);
  };
  const handleAddPost = async (e) => {
    e.preventDefault();
    if (content === '') return;
    addPostHandler(content);
    setContent('');
  };

  return (
    <form className="flex flex-col w-full p-4 gap-2" onSubmit={handleAddPost}>
      <input
        type="text"
        placeholder="What's happening ?"
        className="border-0 outline-0 bg-inherit  py-4 px-2"
        value={content}
        onChange={handleContentData}
      />
      <div className="flex items-center justify-end gap-4">
        <div>
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M5 21q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.588 1.413T19 21H5Zm0-2h14V5H5v14Zm1-2h12l-3.75-5l-3 4L9 13l-3 4Zm-1 2V5v14Z"
            />
          </svg> */}
        </div>
        <button
          className="bg-pink-600 rounded-full px-6 py-1 place-self-end tracking-widest"
          type="submit"
        >
          Post
        </button>
      </div>
    </form>
  );
}
