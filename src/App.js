import './App.css';
import { Routes, Route } from 'react-router-dom';
import Mockman from 'mockman-js';
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Bookmarks from './pages/Bookmarks';
import { RequiresAuth } from '../src/components/RequiresAuth';
import Login from './pages/Login';
function App() {
  return (
    <main className="App lg:px-6 h-screen">
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
        </Route>
        <Route path="/mockman" element={<Mockman />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </main>
  );
}

export default App;
