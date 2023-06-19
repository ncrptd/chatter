import React from 'react';

export default function ProfileCard({ user }) {
  return (
    <div className="text-center ">
      <div className="flex justify-between px-10 py-2 border border-slate-500 bg-slate-900">
        <div className="flex flex-col items-center gap-2">
          <div className="w-36 h-36 rounded-full bg-slate-100 overflow-hidden">
            <img
              src={user?.profilePic}
              alt="user-profile"
              className="w-full h-full object-cover "
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
        <div className="flex flex-col item  gap-6">
          <button className="block border-2 border-pink-500 px-2 py-1 rounded-full">
            Edit Profile
          </button>
          <button className="block bg-red-500 text-white rounded-full px-2 py-1">
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
