import React from 'react';
import SuggestionCard from './SuggestionCard';
import { usePost } from '../context/PostContext';
import SuggestionSkeletonCard from './skeletons/SuggestionSkeletonCard';

export default function Suggestions() {
  const { state } = usePost();
  const { posts } = state;

  return (
    <aside className="col-span-3 hidden md:block h-screen overflow-auto suggestions">
      <div className="container mx-auto py-2">
        <p className="font-bold mb-6 ">Suggestions for you</p>

        {posts.length >= 1 ? (
          <>
            {' '}
            <SuggestionCard />
            <SuggestionCard />
            <SuggestionCard />
            <SuggestionCard />
            <SuggestionCard />
            <SuggestionCard />
            <SuggestionCard />
            <SuggestionCard />
            <SuggestionCard />
            <SuggestionCard />
          </>
        ) : (
          <SuggestionSkeletonCard />
        )}
      </div>
    </aside>
  );
}
