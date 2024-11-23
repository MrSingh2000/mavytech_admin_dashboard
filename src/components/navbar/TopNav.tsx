import { RiNotification4Line } from 'react-icons/ri';
import { BiMessage } from 'react-icons/bi';
import { RiSettings3Line } from 'react-icons/ri';
import { FaCircleUser } from 'react-icons/fa6';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { TbLogout2 } from 'react-icons/tb';
import { clearLocalStorage } from '@/helper/functions';
import { setUser } from '@/redux/slices/authSlice';
import { useDispatch } from 'react-redux';

function TopNav() {
  const dispatch = useDispatch();
  const [openProfileDropdown, setOpenProfileDropdown] =
    useState<boolean>(false);

  const handleLogout = (): void => {
    clearLocalStorage();
    dispatch(
      setUser({
        authToken: null,
        userType: null,
        details: undefined,
      })
    );
  };

  return (
    <>
      <div className="h-[56px] flex justify-end items-center gap-4 px-4 bg-white shadow-sm">
        <div className="p-2 bg-blueCyan rounded-lg">
          <RiNotification4Line color="#2D9CDB" />
        </div>
        <div className="p-2 bg-blueCyan rounded-lg">
          <BiMessage color="#2D9CDB" />
        </div>
        <div className="p-2 bg-[#FF5B5B26] rounded-lg">
          <RiSettings3Line color="#FF5B5B" />
        </div>
        <div className="w-[1px] border-[1px] border-grey h-3/4"></div>
        <div>Hello, user</div>

        <div className="relative inline-block text-left">
          <div>
            <button
              type="button"
              className="  flex items-center justify-center w-full rounded-md  px-4 py-2 text-sm font-medium dark:text-gray-50 hover:bg-gray-50 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-green-500"
              id="options-menu"
              onClick={() => setOpenProfileDropdown((prev) => !prev)}
            >
              <FaCircleUser size={30} />
            </button>
          </div>
          {openProfileDropdown && (
            <div className="absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
              <div
                className="py-1 "
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <button
                  className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600 w-full"
                  role="menuitem"
                  onClick={handleLogout}
                >
                  <span className="flex flex-col">
                    <span className="flex items-center gap-3">
                      <TbLogout2 /> Logout
                    </span>
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="h-[calc(100vh-56px)] overflow-y-auto p-6">
        <Outlet />
      </div>
    </>
  );
}

export default TopNav;
