import React from 'react';
import BookmarkList from '../components/BookmarkList';

export default function Bookmarks() {
  return (
    <section className="bg-slate-900 h-screen overflow-auto ">
      <h1 className="text-center p-2 font-semibold bg-gray-800 border-x border-slate-500">
        Bookmark
      </h1>
      <BookmarkList />
    </section>
  )
}