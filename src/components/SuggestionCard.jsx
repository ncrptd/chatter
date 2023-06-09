import React from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';


export default function SuggestionCard({ user, disableFollow, setDisableFollow }) {

  const { followUserHandler } = useUser();

  const navigate = useNavigate();

  const handleFollow = async (e) => {
    e.stopPropagation();
    await followUserHandler(user?._id, setDisableFollow);
  }
  const handelProfileNavigation = () => {
    navigate(`/profile/${user?._id}`)
  }
  return (
    <div className="flex justify-between items-center mb-4 hover:cursor-pointer " >
      <div className="flex gap-2 justify-start items-center overflow-clip" onClick={handelProfileNavigation}>
        <div className="w-10 h-10 rounded-full overflow-hidden" >
          <img src={user?.profilePic} alt={user?.fullName} className='w-full h-full object-cover' />
        </div>
        <div className=' w-1/2'>
          <p className="text-semibold text-ellipsis overflow-hidden">{user?.fullName}</p>
        </div>
      </div>
      <div>
        <button className="bg-white text-black rounded-full py-1 px-4 hover:opacity-80 " onClick={handleFollow} disabled={disableFollow}>
          Follow
        </button>
      </div>
    </div>
  );
}
