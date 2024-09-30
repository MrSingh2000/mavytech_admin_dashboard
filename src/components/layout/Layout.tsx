import { Outlet } from 'react-router-dom';
import SideNav from '../navbar/SideNav';
import TopNav from '../navbar/TopNav';

function Layout() {
  return (
      <div className="flex h-screen w-screen overflow-hidden">
        <div className="bg-white w-1/4 max-w-52 shadow-sm z-10">
          <SideNav />
        </div>
        <div className="bg-bgGrey w-full h-screen">
          <TopNav />
          <Outlet />
        </div>
      </div>
  );
}

export default Layout;
