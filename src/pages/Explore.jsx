import React from 'react';
import ExploreList from '../components/ExploreList';
import Goback from '../components/Goback';

export default function Explore() {


  return (
    <section className="bg-slate-900 h-screen overflow-auto ">

      <div className="text-center p-2 font-semibold bg-gray-800 border-x border-slate-500 flex justify-between items-center ">
        <Goback />
        <h1>Explore</h1>
        <div></div>
      </div>
      <ExploreList />
    </section>
  );
}
