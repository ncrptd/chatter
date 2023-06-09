import './App.css';
import { Routes, Route } from 'react-router-dom';
import Mockman from 'mockman-js';
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Bookmarks from './pages/Bookmarks';
import { RequiresAuth } from '../src/components/RequiresAuth';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {


  return (
    <main className="App lg:px-6">
      <Routes>
        <Route
          path="/"
          element={
            <RequiresAuth>
              <RootLayout />
            </RequiresAuth>
          }
        >
          <Route index element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/profile/:userId" element={<Profile />} />
        </Route>
        <Route path="/mockman" element={<Mockman />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </main>
  );
}

export default App;
