import React from 'react';

export default function SuggestionCard() {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex gap-2 justify-center items-center">
        <div className="w-10 h-10 rounded-full bg-slate-100"></div>
        <div>
          <p className="text-semibold">Alamin</p>
          <p className="font-thin text-slate-400 ">@John doe</p>
        </div>
      </div>
      <div>
        <button className="bg-white text-black rounded-full py-1 px-4">
          Follow
        </button>
      </div>
    </div>
  );
}
