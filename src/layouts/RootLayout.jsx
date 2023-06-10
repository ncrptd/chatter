import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Suggestions from '../components/Suggestions';
import Navbar from '../components/mobile/Navbar';

export default function RootLayout() {
  return (
    <div className=" md:grid grid-cols-8 gap-4">
      <Header />
      <div className="w-full md:col-span-4 bg-slate-800">
        <Outlet />
      </div>
      <Suggestions />
      <Navbar />
    </div>
  );
}
