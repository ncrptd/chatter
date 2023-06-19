import React from 'react';

export default function ProfileSkeletonCard() {
  return (
    <div className="text-center ">
      <p className="p-4 "></p>
      <p className="p-4"></p>

      <div className="flex justify-between px-10 py-2 border border-slate-500 bg-slate-900">
        <div className="flex flex-col items-center gap-2">
          <div className="w-36 h-36 p-4 rounded-full skeleton  round">
            {/* image  */}
          </div>
          <div>
            <p className="skeleton p-2"></p>
            <p className="p-2 skeleton"></p>
          </div>
          <p>
            <span className="mr-2 p-2 skeleton"></span>
            <span
              className="p-2 skeleton
            "
            ></span>
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
