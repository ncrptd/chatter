import axios from 'axios';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth, useAuthDispatch } from '../context/AuthContext';
import { AUTH_ACTIONS } from '../reducer/authReducer';
import { useUser, useUserDispatch } from '../context/UserContext';
import { USER_ACTIONS } from '../reducer/userReducer';
import { usePost } from '../context/PostContext';

const GUEST = {
  username: 'rockeywithane',
  password: 'rockeywithane',
};

export default function Login() {
  const [formDetails, setFormDetails] = useState({
    username: '',
    password: '',
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [show, setShow] = useState(false);
  const authDispatch = useAuthDispatch();
  const { getAllPostHandler } = usePost();
  const { editUserHandler } = useUser();
  const userDispatch = useUserDispatch();

  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const handleFormDetails = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormDetails((prevForm) => {
      return { ...prevForm, [name]: value };
    });
  };
  async function handleLogin({ username, password }) {
    if (isLoggedIn) return;
    if (username !== '' && password !== '') {
      try {
        const res = await axios.post('/api/auth/login', {
          username: username,
          password: password,
        });
        const { foundUser, encodedToken } = res.data;
        authDispatch({
          type: AUTH_ACTIONS.LOGIN_SUCCESS
        });
        userDispatch({
          type: USER_ACTIONS.SAVE_USER,
          payload: { userDetails: foundUser },
        });
        localStorage.setItem(
          'user',
          JSON.stringify({
            userDetails: foundUser,
            encodedToken: encodedToken,
          })
        );

        if (location?.state?.from?.pathname === undefined) {
          navigate('/');
        } else {
          navigate(location?.state?.from?.pathname);
        }
      } catch (error) {
        console.log(error.message);
        setErrorMsg('No user found');
        authDispatch({ type: AUTH_ACTIONS.LOGIN_FAILURE, payload: error });
      }
    }
  }
  function handleGuestLogin(guest) {
    const { username, password } = guest;

    setFormDetails((prev) => {
      return { ...prev, username, password };
    });
    handleLogin(guest);
  }
  return (
    <main className="p-4 w-full ">
      <h1 className="text-uppercase text-pink-500 uppercase font-bold text-2xl text-center">
        Chatter
      </h1>
      <div className="container h-5/6 flex justify-center items-center p-6 w-full">
        <form
          className="container mx-auto flex flex-col justify-center item-center gap-4  p-4 md:w-2/5 rounded-2xl shadow-2xl text-base"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin(formDetails);
          }}
        >
          <label htmlFor="username ">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formDetails.username}
            placeholder="johndoe"
            onChange={handleFormDetails}
            className=" rounded-sm p-2 bg-slate-900 focus:outline-0 "
          />
          <label htmlFor="password">Password</label>
          <div className="flex justify-between items-center">
            <input
              type={show ? 'text' : 'password'}
              id="password"
              name="password"
              value={formDetails.password}
              placeholder="*******"
              onChange={handleFormDetails}
              className=" rounded-sm p-2 focus:outline-0  w-full bg-slate-900"
            />
            <div
              className="rounded-sm p-2  bg-slate-900"
              onClick={() => {
                setShow((prev) => {
                  return !prev;
                });
              }}
            >
              {show ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              )}
            </div>
          </div>
          <button
            className="bg-pink-600 text-white
           py-1 px-4 w-full  rounded-full"
            type="submit"
          >
            Login
          </button>
          <button
            className="bg-pink-600 text-white
           py-1 px-4 w-full  shadow-2xl rounded-full"
            onClick={(e) => {
              e.preventDefault();
              handleGuestLogin(GUEST);
            }}
          >
            Login as Guest
          </button>
          <p>
            Don't have an account ?{' '}
            <Link to="/signup" className="text-pink-600 hover:text-slate-500">
              Sign up
            </Link>
          </p>
          <p className="font-bold uppercase text-red-500 text-center 2xl ">
            {errorMsg}
          </p>
        </form>
      </div>
    </main>
  );
}
