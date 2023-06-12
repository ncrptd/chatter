export default function PostCard() {
  return (
    <div className="p-4 w-full min-h-max items-center border-x border-b border-slate-500">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 ">
          <div className="w-10 h-10 rounded-full bg-slate-100"></div>
          <p className="text-semibold">Alamin</p>
          <p className="font-thin text-slate-400 ">@John doe ◦</p>
          <p className="font-thin text-slate-400">15 hr</p>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="cursor-pointer"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0"
          />
        </svg>
      </div>
      <p className="mt-4 text-sm">
        I met this street food seller in Gyeongju on a recommendation from a
        dating app. This man was adopted and grew up in US. He moved to Korea to
        find his birth mother. And he did! I often think back to our
        conversation #MondayMotivation
      </p>
      <div className="flex gap-4 mt-4 font-thin text-slate-200 ">
        {/* comment  */}
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="cursor-pointer"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1"
              d="M19 4H5a2 2 0 0 0-2 2v15l3.467-2.6a2 2 0 0 1 1.2-.4H19a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"
            />
          </svg>
        </button>
        {/* like  */}

        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 48 48"
            className="text-red-400 cursor-pointer"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 8C8.925 8 4 12.925 4 19c0 11 13 21 20 23.326C31 40 44 30 44 19c0-6.075-4.925-11-11-11c-3.72 0-7.01 1.847-9 4.674A10.987 10.987 0 0 0 15 8Z"
            />
          </svg>
        </button>
        {/* bookmark
         */}
        <button>
          {' '}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="text-green-400 cursor-pointer"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1"
              d="M17 3H7a2 2 0 0 0-2 2v15.138a.5.5 0 0 0 .748.434l5.26-3.005a2 2 0 0 1 1.984 0l5.26 3.006a.5.5 0 0 0 .748-.435V5a2 2 0 0 0-2-2z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
