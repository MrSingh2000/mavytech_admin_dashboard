import React from 'react';
import { RiNotification4Line } from 'react-icons/ri';
import { BiMessage } from 'react-icons/bi';
import { RiSettings3Line } from 'react-icons/ri';
import { FaCircleUser } from 'react-icons/fa6';
import { Outlet } from 'react-router-dom';

function TopNav() {
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
        <div className="cursor-pointer">
          <FaCircleUser size={30} />
        </div>
      </div>
      <div className='h-[calc(100vh-56px)] overflow-y-auto p-6'>
        <Outlet />
      </div>
    </>
  );
}

export default TopNav;
