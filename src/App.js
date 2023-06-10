import './App.css';
import { Routes, Route } from 'react-router-dom';
import Mockman from 'mockman-js';
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Bookmarks from './pages/Bookmarks';
function App() {
  return (
    <main className="App p-2">
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
        </Route>

        <Route path="/mockman" element={<Mockman />} />
      </Routes>
    </main>
  );
}

export default App;
