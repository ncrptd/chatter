import React from 'react';

export default function SuggestionSkeletonCard() {
  return Array(5)
    .fill(0)
    .map((i) => (
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2 justify-center items-center">
          <div className="w-10 h-10 skeleton round"></div>
          <div>
            <p className="py-2 px-8 skeleton mb-2"></p>
            <p className="py-2 skeleton"></p>
          </div>
        </div>
        <div>
          <button className=" py-1 px-4 h-8 w-20 skeleton button "></button>
        </div>
      </div>
    ));
}
