import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Suggestions from '../components/Suggestions';
import Navbar from '../components/mobile/Navbar';

export default function RootLayout() {
  return (
    <div className=" md:grid grid-cols-12 gap-4 h-screen overflow-hidden">
      <Header />
      <div className="w-full md:col-span-7 bg-slate-800">
        <Outlet />
      </div>
      <Suggestions />
      <Navbar />
    </div>
  );
}
