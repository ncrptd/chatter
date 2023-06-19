import React from 'react';
import { usePostDispatch } from '../../context/PostContext';
import { POST_ACTIONS } from '../../reducer/postReducer';
import { createPortal } from 'react-dom';

export default function ProfileEditModal({ profileDetails }) {
  const postDispatch = usePostDispatch();

  const closeModal = (e) => {
    e.stopPropagation();
    postDispatch({ type: POST_ACTIONS.EDIT_POST, payload: { post: null } });
  };
  const portalEl = document.querySelector('.portal');

  return createPortal(
    <>
      {/* <div className=" modal-wrapper bg-slate-800" onClick={closeModal}></div> */}
      <div className="bg-slate-800 flex flex-col gap-2 text-center ">
        <h1 className=" p-2 font-semibold bg-gray-800 border-x border-slate-500">
          Edit Profile
        </h1>
        {/* avatar section  */}
        <div className="w-20 h-20 rounded-full bg-slate-300 mx-auto">
          {/* <img src={profileDetails?.image} alt="profile" /> */}
        </div>
        {/* bio section  */}
        <label htmlFor="bio" className="text-2xl ">
          Bio
        </label>
        <textarea
          type="text"
          // onChange={handleInputChange}
          // value={editValue}
          name="bio"
          id="bio"
          placeholder="Something about you..."
          className="bg-inherit resize-none p-4 border border-slate-400 outline-none focus:outline-pink-500 focus:border-none"
        />
        {/* link section  */}
        <label htmlFor="link" className="text-2xl ">
          Link
        </label>
        <input
          type="text"
          name="link"
          id="link"
          className="bg-inherit border border-slate-400 p-4 w-full rounded-md"
        />
        <button className=" bg-pink-700 rounded-lg px-4 py-2  tracking-widest disabled:opacity-75 mx-auto">
          Update
        </button>
      </div>
    </>,
    portalEl
  );
}
