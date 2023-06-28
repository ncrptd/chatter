import { Link, useNavigate } from 'react-router-dom';
import { useUser, useUserDispatch } from '../context/UserContext';
import { AUTH_ACTIONS } from '../reducer/authReducer';
import { USER_ACTIONS } from '../reducer/userReducer';
import { useAuthDispatch } from '../context/AuthContext';
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
    <header className="col-span-2 hidden md:block text-2xl header">
      <div className="py-2">
        <h1 className="text-uppercase text-pink-500 uppercase mb-6 font-bold">
          Chatter
        </h1>
        <ul className="flex flex-col gap-8 font-semibold justify-center">
          <li className="flex gap-2 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="m12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z"
              />
            </svg>
            <Link to="/"> Home</Link>
          </li>
          <li className="flex gap-2 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8zm-5.5-2.5l7.51-3.49L17.5 6.5L9.99 9.99L6.5 17.5zm5.5-6.6c.61 0 1.1.49 1.1 1.1s-.49 1.1-1.1 1.1s-1.1-.49-1.1-1.1s.49-1.1 1.1-1.1z"
              />
            </svg>
            <Link to="/explore">Explore</Link>
          </li>
          <li className="flex gap-2 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3l7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z"
              />
            </svg>
            <Link to="/bookmarks">Bookmarks</Link>
          </li>
          <li className="flex gap-2  items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
            >
              <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
                <path d="M16 9a4 4 0 1 1-8 0a4 4 0 0 1 8 0Zm-2 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0Z" />
                <path d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11s11-4.925 11-11S18.075 1 12 1ZM3 12c0 2.09.713 4.014 1.908 5.542A8.986 8.986 0 0 1 12.065 14a8.984 8.984 0 0 1 7.092 3.458A9 9 0 1 0 3 12Zm9 9a8.963 8.963 0 0 1-5.672-2.012A6.992 6.992 0 0 1 12.065 16a6.991 6.991 0 0 1 5.689 2.92A8.964 8.964 0 0 1 12 21Z" />
              </g>
            </svg>
            <Link to={`/profile/${userId}`}>Profile</Link>
          </li>
          <li onClick={handleLogout} className="flex gap-2 items-center cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="currentColor" d="M5 21q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h7v2H5v14h7v2H5Zm11-4l-1.375-1.45l2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5l-5 5Z" /></svg>
            Logout
          </li>
        </ul>
      </div>
    </header>
  );
}
