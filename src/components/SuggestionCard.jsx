import React from 'react';
import { useUser } from '../context/UserContext';

export default function SuggestionCard({ user }) {
  const { followUserHandler } = useUser();
  const handleFollow = () => {
    followUserHandler(user?._id)
  }
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex gap-2 justify-center items-center">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img src={user?.profilePic} alt={user?.fullName} className='w-full h-full object-cover ' />
        </div>
        <div>
          <p className="text-semibold">{user?.fullName}</p>
          {/* <p className="font-thin text-slate-400 ">@{user?.username}</p> */}
        </div>
      </div>
      <div>
        <button className="bg-white text-black rounded-full py-1 px-4" onClick={handleFollow}>
          Follow
        </button>
      </div>
    </div>
  );
}
