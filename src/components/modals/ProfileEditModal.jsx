import React from 'react';
import { createPortal } from 'react-dom';
import { useState } from 'react';
import { useUser, useUserDispatch } from '../../context/UserContext';
import { USER_ACTIONS } from '../../reducer/userReducer';
import { useRef } from 'react';
import axios from 'axios';

const UPLOAD_PRESET = 'chatter'

export default function ProfileEditModal({ user }) {
  const [profileDetails, setProfileDetails] = useState({
    bio: user?.bio,
    website: user?.website,
  });
  const { editUserHandler } = useUser();
  const userDispatch = useUserDispatch();

  const [image, setImage] = useState(null);

  const imgRef = useRef();


  const handleInputChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setProfileDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };


  const closeModal = () => {
    // e.stopPropagation();
    userDispatch({
      type: USER_ACTIONS.OPEN_PROFILE_EDIT_MODAL,
      payload: { payload: false },
    });
  };
  const portalEl = document.querySelector('.portal');

  const handleImageClick = () => {
    imgRef.current.click();
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      if (image) {
        console.log('called')
        const data = new FormData();
        data.append('file', image);
        data.append("upload_preset", UPLOAD_PRESET);
        const res = await axios.post(`https://api.cloudinary.com/v1_1/dazl0yblg/image/upload`, data);

        console.log(res);
      }
      const userData = profileDetails;
      editUserHandler(userData);
      closeModal();
    } catch (error) {
      console.log(`cloudinary api failed with error`, error)
    }
  }


  return createPortal(
    <>
      <div className=" modal-wrapper bg-slate-800" onClick={closeModal}></div>
      <div className="bg-slate-900 flex flex-col gap-2 text-center modal w-3/4 md:w-1/4 p-4 rounded-lg shadow-md shadow-slate-700">
        <h1 className=" p-2 font-semibold ">Edit Profile</h1>
        {/* avatar section  */}
        <div
          className="w-20 h-20 rounded-full bg-slate-300 mx-auto overflow-hidden relative cursor-pointer"
          onClick={handleImageClick}
        >
          <input
            type="file"
            name=""
            id=""
            className="hidden"
            ref={imgRef}
            onChange={handleImageChange}
          />

          {image ? (
            <img src={URL.createObjectURL(image)} alt="profile" />
          ) : (
            <img
              src={
                user?.profilePic ||
                'https://res.cloudinary.com/donqbxlnc/image/upload/v1651664931/avatar-1577909_960_720_cl1ooh.png'
              }
              alt="profile"
              className="w-full h-full object-cover "
            />
          )}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            className="absolute bottom-2 right-3 "
            viewBox="0 0 256 256"
          >
            <path
              fill="currentColor"
              d="M208 56h-27.72l-13.63-20.44A8 8 0 0 0 160 32H96a8 8 0 0 0-6.65 3.56L75.71 56H48a24 24 0 0 0-24 24v112a24 24 0 0 0 24 24h160a24 24 0 0 0 24-24V80a24 24 0 0 0-24-24Zm-44 76a36 36 0 1 1-36-36a36 36 0 0 1 36 36Z"
            />
          </svg>
        </div>
        {/* bio section  */}
        <form onSubmit={handleEditSubmit}>
          <label htmlFor="bio" className=" ">
            Bio
          </label>
          <textarea
            type="text"
            onChange={handleInputChange}
            value={profileDetails.bio}
            name="bio"
            id="bio"
            placeholder="Something about you..."
            className="bg-inherit resize-none p-4 border border-slate-400 outline-none h-28"
          />
          {/* website section  */}
          <label htmlFor="website" className=" ">
            Website
          </label>
          <input
            type="url"
            name="website"
            id="website"
            className="bg-inherit  border border-slate-400 outline-none p-4 w-full rounded-md"
            onChange={handleInputChange}
            value={profileDetails.website}
          />
          <button className=" bg-pink-600 rounded-lg px-4 py-2  tracking-widest disabled:opacity-75 my-2 mx-auto" type='submit'>
            Update
          </button>
        </form>
      </div>
    </>,
    portalEl
  );
}
