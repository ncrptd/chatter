import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Suggestions from '../components/Suggestions';

export default function RootLayout() {
  return (
    <div className="grid grid-cols-12">
      <Header />
      <div className="col-span-8 border-2 border-red-500">
        <Outlet />
      </div>
      <Suggestions />
    </div>
  );
}
