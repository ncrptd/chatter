import React from 'react';
import CreatePost from '../components/CreatePost';

export default function Home() {
  return (
    <section className=" bg-slate-900 ">
      <div className="container mx-auto p-2">
        <h1 className="font-bold text-2xl ">Home</h1>
        <CreatePost />
      </div>
    </section>
  );
}
