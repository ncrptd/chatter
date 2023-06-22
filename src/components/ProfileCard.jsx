import React from 'react';
import { useUser, useUserDispatch } from '../context/UserContext';
import { USER_ACTIONS } from '../reducer/userReducer';
import ProfileEditModal from './modals/ProfileEditModal';

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
  const website = new URL(user.website).hostname;

  return (
    <div className='flex items-start gap-4 border border-slate-500 bg-slate-900 px-10 py-4 flex-wrap md:flex-nowrap text-center md:justify-between w-full'>
      {/* image container  */}

      <div className='w-full '>
        <div className="w-28 h-28 rounded-full bg-slate-100 overflow-hidden md:w-44 md:h-44 mx-auto">
          <img
            src={user?.profilePic}
            alt="user-profile"
            className="w-full h-full object-cover"
          />

        </div>
      </div>
      <div className='flex flex-col gap-1 font-semibold w-full '>
        <p>{user?.fullName}</p>
        <p className='text-sm text-slate-400 '>@{user?.username}</p>
        <p className='font-thin word-breaks w-full overflow-clip'>{user?.bio}</p>
        <p className='text-blue-500 font-thin '>
          <a href={user?.website} target='_blank' rel="noreferrer" className='w-full '>{website}</a>
        </p>
        <p className='flex gap-2'>
          <span>{user?.followers}</span>
          <span>{user?.following}</span>
        </p>
        {loggedInUser ? <>
          <button className='bg-green-500 text-white rounded-lg py-2 hover:opacity-80 mb-2' onClick={handleProfileModal}>
            Edit
          </button>
          <button className='bg-red-500 text-white rounded-lg py-2 hover:opacity-80'>
            Logout
          </button>
        </> : <button className="bg-white text-black rounded-lg py-2 hover:opacity-80">
          {isFollowing ? 'UnFollow' : 'Follow'}
        </button>}

      </div>
      {openProfileEditModal && <ProfileEditModal user={user} />}
    </div>
  );
}
