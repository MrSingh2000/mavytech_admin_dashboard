import { ReactElement } from 'react';
import { IoHomeOutline } from 'react-icons/io5';
import { TbWashMachine } from 'react-icons/tb';
import { NavLink } from 'react-router-dom';

type NavItemType = {
  icon: ReactElement;
  title: string;
  navLink: string;
};

function SideNav() {
  const navItems: NavItemType[] = [
    {
      icon: <IoHomeOutline />,
      title: 'Dashboard',
      navLink: '/',
    },
    {
      icon: <TbWashMachine />,
      title: 'Equipment',
      navLink: '/equipment',
    },
  ];

  return (
    <div className="p-5 h-screen flex flex-col">
      <div className="pb-[40px]">
        <p className="text-3xl">MavyTech</p>
        <p className="text-sm text-textLight">Admin Dashboard</p>
      </div>

      {/* list items */}
      <div className="flex flex-col gap-2 grow">
        {navItems.map((item) => (
          <NavItem data={item} key={item.navLink} />
        ))}
      </div>
    </div>
  );
}

type NavItemProps = {
  data: NavItemType;
};

function NavItem({ data }: NavItemProps) {
  return (
    <NavLink
      to={data.navLink}
      className={({ isActive }) =>
        `flex gap-3 py-[6px] px-[10px] rounded-lg items-center cursor-pointer ${
          isActive
            ? 'bg-success20percent text-success font-bold'
            : 'bg-white font-semibold'
        }`
      }
    >
      <div>{data.icon}</div>
      <div>{data.title}</div>
    </NavLink>
  );
}

export default SideNav;
