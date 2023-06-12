import React from 'react';
import SuggestionCard from './SuggestionCard';

export default function Suggestions() {
  return (
    <aside className="col-span-3 hidden lg:block h-screen overflow-auto suggestions">
      <div className="container mx-auto py-2">
        <p className="font-bold mb-6 ">Suggestions for you</p>
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
      </div>
    </aside>
  );
}
