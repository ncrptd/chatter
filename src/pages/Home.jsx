import React from 'react';
import CreatePost from '../components/CreatePost';
import PostList from '../components/PostList';

export default function Home() {
  return (
    <section className=" bg-slate-900 h-screen overflow-auto home">
      <h1 className="text-center p-2 font-semibold bg-gray-800 border-x border-slate-500">
        Home
      </h1>
      <div className="container mx-auto  border border-slate-500 ">
        <CreatePost />
      </div>

      <PostList />
    </section>
  );
}
