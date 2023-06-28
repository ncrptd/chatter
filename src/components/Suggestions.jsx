import React from 'react';
import SuggestionCard from './SuggestionCard';
import SuggestionSkeletonCard from './skeletons/SuggestionSkeletonCard';
import { useUser } from '../context/UserContext';

export default function Suggestions() {
  const { state } = useUser();
  const { allUsers, userDetails } = state;
  const suggestedUsers = allUsers.filter((user) => user._id !== userDetails?._id);

  function removeAlreadyFollowing(users) {
    if (suggestedUsers.length <= 0) {
      return null
    }
    return users.filter((user) => user._id !== userDetails?.following.find((f) => f._id === user._id)?._id)
  }

  const visibleUsers = removeAlreadyFollowing(suggestedUsers)
  return (
    <aside className="col-span-3 hidden md:block h-screen overflow-auto suggestions">
      <div className="container mx-auto py-2">
        <p className="font-bold mb-6 ">Suggestions for you</p>
        {!visibleUsers ? <SuggestionSkeletonCard /> : visibleUsers.length <= 0 ? <p>No Suggestion</p> : visibleUsers.map((user) => <SuggestionCard user={user} key={user?._id} />)}
      </div>
    </aside>
  );
}
