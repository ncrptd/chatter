import React from 'react';
import { useUser, useUserDispatch } from '../context/UserContext';
import { USER_ACTIONS } from '../reducer/userReducer';
import ProfileEditModal from './modals/ProfileEditModal';
import { useAuthDispatch } from '../context/AuthContext';
import { AUTH_ACTIONS } from '../reducer/authReducer';
import { useNavigate } from 'react-router-dom';

export default function ProfileCard({ user, disableFollow, setDisableFollow }) {
  const { state: userState, followUserHandler, unFollowUserHandler } = useUser();
  const { openProfileEditModal, userDetails } = userState;
  const userDispatch = useUserDispatch();
  const authDispatch = useAuthDispatch();

  const loggedInUser = user?._id === userDetails?._id;
  const isFollowing = user.followers.find((i) => i._id === userDetails?._id);

  const website = user.website && new URL(user?.website).hostname;

  const navigate = useNavigate();

  const handleProfileModal = () => {
    userDispatch({
      type: USER_ACTIONS.OPEN_PROFILE_EDIT_MODAL,
      payload: { open: true },
    });
  };

  const handleFollowUser = () => {
    followUserHandler(user?._id, setDisableFollow);
  }
  const handleUnfollowUser = () => {
    unFollowUserHandler(user?._id, setDisableFollow)
  };

  const handleLogout = () => {
    localStorage.clear();
    userDispatch({ type: USER_ACTIONS.SAVE_USER, payload: { userDetails: null } });
    authDispatch({ type: AUTH_ACTIONS.LOGOUT })
    navigate('/')
  }
  return (
    <div className='flex items-start gap-4 border border-slate-500  bg-slate-900 px-4 py-2 flex-wrap md:flex-nowrap text-center md:justify-between w-full'>
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
      <div className='flex flex-col gap-2 w-full '>
        <p className='font-bold text-lg word-breaks w-full overflow-clip'>{user?.fullName}</p>
        <p className='text-sm text-slate-400 word-breaks w-full overflow-clip text-ellipsis	'>@{user?.username}</p>
        <p className='font-thin word-breaks w-full overflow-clip'>{user?.bio}</p>
        <p className='text-blue-500 font-thin '>
          <a href={user?.website} target='_blank' rel="noreferrer" className='w-full '>{website}</a>
        </p>
        <p className='flex gap-2 justify-center text-slate-400'>
          <span>{user?.followers.length} followers</span>
          <span>{user?.following.length} following</span>
        </p>
        {loggedInUser ? <>
          <button className='bg-green-500 text-white rounded-lg py-2 hover:opacity-80 mb-2 w-2/4 mx-auto' onClick={handleProfileModal}>
            Edit
          </button>
          <button className='bg-red-500 text-white rounded-lg py-2 hover:opacity-80  w-2/4 mx-auto' onClick={handleLogout}>
            Logout
          </button>
        </> :
          <>
            {
              isFollowing ?
                <button className="bg-white text-black rounded-lg py-2 hover:opacity-80 w-2/4 mx-auto font-semibold" disabled={disableFollow} onClick={handleUnfollowUser}>
                  Unfollow
                </button> : <button className="bg-white text-black rounded-lg py-2 hover:opacity-80 w-2/4 mx-auto font-semibold" disabled={disableFollow} onClick={handleFollowUser}>
                  Follow
                </button>}
          </>
        }
      </div>
      {openProfileEditModal && <ProfileEditModal user={user} />}
    </div>
  );
}
