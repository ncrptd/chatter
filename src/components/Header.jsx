import { Link, useNavigate } from 'react-router-dom';
import { useUser, useUserDispatch } from '../context/UserContext';
import { AUTH_ACTIONS } from '../reducer/authReducer';
import { USER_ACTIONS } from '../reducer/userReducer';
import { useAuthDispatch } from '../context/AuthContext';
import SuggestionSkeletonCard from './skeletons/SuggestionSkeletonCard';

export default function Header() {
  const { state } = useUser();
  const { userDetails } = state;
  const userId = userDetails?._id;
  const userDispatch = useUserDispatch();
  const authDispatch = useAuthDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    userDispatch({ type: USER_ACTIONS.SAVE_USER, payload: { userDetails: null } });
    authDispatch({ type: AUTH_ACTIONS.LOGOUT });
    navigate('/')
  }
  return (
    <header className="col-span-2 hidden md:block text-2xl header h-screen">
      <div className="py-2 flex flex-col justify-between  h-full">

        <div className=''>
          <h1 className="text-uppercase text-pink-500 uppercase mb-6 font-bold text-center">
            Chatter
          </h1>
          <ul className="flex flex-col gap-8 font-semibold justify-center">
            <li className="flex gap-2 items-center justify-center">

              <Link to="/">  <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="m12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z"
                />
              </svg></Link>
            </li>
            <li className="flex gap-2 items-center justify-center">

              <Link to="/explore">   <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8zm-5.5-2.5l7.51-3.49L17.5 6.5L9.99 9.99L6.5 17.5zm5.5-6.6c.61 0 1.1.49 1.1 1.1s-.49 1.1-1.1 1.1s-1.1-.49-1.1-1.1s.49-1.1 1.1-1.1z"
                />
              </svg></Link>
            </li>
            <li className="flex gap-2 items-center justify-center">

              <Link to="/bookmarks"> <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3l7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z"
                />
              </svg></Link>
            </li>

            <li className="flex gap-2 items-center justify-center cursor-pointer" onClick={handleLogout} >
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill="currentColor" d="M5 21q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h7v2H5v14h7v2H5Zm11-4l-1.375-1.45l2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5l-5 5Z" /></svg>
              {/* Logout */}
            </li>
          </ul>
        </div>
        {userDetails ? <div className="flex items-center justify-center gap-2 py-2 overflow-clip w-full ">
          <div className="w-4/4">

            <Link to={`/profile/${userId}`}>
              <div className='w-12 h-12 rounded-full overflow-hidden'>
                <img src={userDetails?.profilePic} alt="" className='object-cover h-full w-full' />
              </div>
            </Link>

          </div>
          <div className='w-full h-6 overflow-hidden text-sm text-slate-400'>
            <Link to={`/profile/${userId}`}>
              <p className='text-ellipsis overflow-hidden hover:text-blue-500 cursor-pointer'>@{userDetails?.username}</p>
            </Link>

          </div>
        </div> : <SuggestionSkeletonCard num={1} hide={true} />}
      </div>
    </header>
  );
}
