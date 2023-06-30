import React from 'react';
import ExploreList from '../components/ExploreList';

export default function Explore() {

  return (
    <section className="bg-slate-900 h-screen overflow-auto ">
      <h1 className="text-center p-2 font-semibold bg-gray-800 border-x border-slate-500">
        Explore
      </h1>
      <ExploreList />
    </section>
  );
}
