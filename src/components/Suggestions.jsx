import React from 'react';
import SuggestionCard from './SuggestionCard';
import SuggestionSkeletonCard from './skeletons/SuggestionSkeletonCard';
import { useUser } from '../context/UserContext';

export default function Suggestions() {
  const { state } = useUser();
  const { allUsers, userDetails } = state;
  const suggestedUsers = allUsers.filter((user) => user._id !== userDetails?._id);
  return (
    <aside className="col-span-3 hidden md:block h-screen overflow-auto suggestions">
      <div className="container mx-auto py-2">
        <p className="font-bold mb-6 ">Suggestions for you</p>

        {suggestedUsers.length >= 1 ? (

          suggestedUsers.map((user) => <SuggestionCard user={user} key={user?._id} />)

        ) : (
          <SuggestionSkeletonCard />
        )}
      </div>
    </aside>
  );
}
