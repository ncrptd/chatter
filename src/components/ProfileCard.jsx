import React from 'react';
import { useUser, useUserDispatch } from '../context/UserContext';
import { USER_ACTIONS } from '../reducer/userReducer';
import ProfileEditModal from './modals/ProfileEditModal';
import { Link } from 'react-router-dom';

export default function ProfileCard({ user }) {
  const { state: userState } = useUser();
  const { openProfileEditModal, userDetails } = userState;

  const userDispatch = useUserDispatch();
  const handleProfileModal = () => {
    userDispatch({
      type: USER_ACTIONS.OPEN_PROFILE_EDIT_MODAL,
      payload: { open: true },
    });
  };
  const loggedInUser = user._id === userDetails._id;
  const isFollowing = userDetails.followers.find((i) => i._id === user._id);
  return (
    <div className="text-center ">
      <div className="flex justify-between px-10 pt-4 pb-2 border border-slate-500 bg-slate-900 ">
        <div className="flex flex-col items-center  gap-2">
          <div className="w-28 h-28 rounded-full bg-slate-100 overflow-hidden md:w-32 md:h-32">
            <img
              src={user?.profilePic}
              alt="user-profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p>{user?.fullName}</p>
            <p className="font-thin text-slate-400">@{user?.username}</p>
          </div>
          <p>
            <span className="mr-2">{user?.following.length} Following</span>
            <span>{user?.followers.length} Followers</span>
          </p>
        </div>
        <div className="flex flex-col justify-around  w-2/4">
          <div>
            <p className="mb-2">{user?.bio} </p>
            <a
              href={user?.website}
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 "
            >
              {user?.website}
            </a>
          </div>
          {loggedInUser ? (
            <>
              <button
                className="block border-2 border-pink-500  rounded-full hover:opacity-80 py-1 px-8  mx-auto"
                onClick={handleProfileModal}
              >
                Edit Profile
              </button>
              <button className="block bg-red-500 text-white rounded-full hover:opacity-80  py-1 px-12  mx-auto">
                Log Out
              </button>
            </>
          ) : (
            <button className="bg-white text-black rounded-full py-1 px-8 mt-6 mx-auto">
              {isFollowing ? 'UnFollow' : 'Follow'}
            </button>
          )}
        </div>
      </div>
      {openProfileEditModal && <ProfileEditModal user={user} />}
    </div>
  );
}
