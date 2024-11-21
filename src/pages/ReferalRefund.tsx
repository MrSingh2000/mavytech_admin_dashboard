import { Avatar } from 'primereact/avatar';
import { Dialog } from 'primereact/dialog';
import { useEffect, useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { Dropdown } from 'primereact/dropdown';
import { RootState } from '../redux/store';
import countriesData from '../components/addAdvertisements/countries.json';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersAction, updateUserAction } from '../redux/slices/usersSlice';
import { createUrl } from '../helper/functions';
import { UserType } from '../types';
import { RxCross2 } from 'react-icons/rx';
import { RiCheckFill, RiCheckLine } from 'react-icons/ri';

function ReferalRefund() {
  const dispatch = useDispatch();
  const [category, setCategory] = useState<string>('Services');

  return (
    <div className="container overflow-hidden">
         <ul className=" m-1 text-md font-medium text-center text-gray-500 rounded-lg shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
          <li className="w-full focus-within:z-10">
            <button
              onClick={() => setCategory('Current')}
              className={`inline-block w-full p-4  border-r border-gray-200 rounded-s-lg focus:ring-2 hover:bg-gray-50  focus:ring-green-500 focus:outline-none focus:bg-success20percent focus:text-success focus:font-bold ${
                category === 'Current'
                  ? 'bg-success20percent text-success font-bold'
                  : 'bg-white'
              }`}
            >
              Current
            </button>
          </li>
          <li className="w-full focus-within:z-10">
            <button
              onClick={() => setCategory('Rejected')}
              className={`inline-block w-full p-4  border-r border-gray-200 dark:border-gray-700 hover:text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-green-500 focus:outline-none focus:bg-success20percent focus:text-success focus:font-bold ${
                category === 'Rejected'
                  ? 'bg-success20percent text-success font-bold'
                  : 'bg-white'
              }`}
            >
              Rejected
            </button>
          </li>

          <li className="w-full focus-within:z-10">
            <button
              onClick={() => setCategory('Accepted')}
              className={`inline-block w-full p-4  border-e-0 border-gray-200 rounded-e-lg hover:bg-gray-50 focus:ring-2 focus:ring-green-500 focus:outline-none focus:bg-success20percent focus:text-success focus:font-bold ${
                category === 'Accepted'
                  ? 'bg-success20percent text-success font-bold'
                  : 'bg-white'
              }`}
            >
              Accepted
            </button>
          </li>
        </ul>
        <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
      <div
        className="inline-block min-w-full overflow-hidden rounded-lg shadow"
        style={{
          height: '30rem',
          overflowY: 'scroll',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <table className="min-w-full leading-normal">
          <thead className="sticky top-0">
            <tr>
              <th
                scope="col"
                className=" px-5 py-3 text-sm font-semibold text-center text-gray-800 uppercase bg-white border-b border-gray-200"
              >
                Request Date
              </th>
              
              <th
                scope="col"
                className="px-5 py-3 text-sm font-semibold text-center text-gray-800 uppercase bg-white border-b border-gray-200"
              >
                User Name
              </th>
              <th
                scope="col"
                className="px-5 py-3 text-sm font-semibold text-center text-gray-800 uppercase bg-white border-b border-gray-200"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-5 py-3 text-sm font-semibold text-center text-gray-800 uppercase bg-white border-b border-gray-200"
              >
                Phone
              </th>

              <th
                scope="col"
                className="px-5 py-3 text-sm font-semibold text-center text-gray-800 uppercase bg-white border-b border-gray-200"
              >
                Referal Points
              </th>
              <th
                scope="col"
                className="px-5 py-3 text-sm font-semibold text-center text-gray-800 uppercase bg-white border-b border-gray-200"
              >
                Amount
              </th>
              {category== 'Current'? <th
                scope="col"
                className="px-5 py-3 text-sm font-semibold text-center text-gray-800 uppercase bg-white border-b border-gray-200"
              >
                Action
              </th> : ''}
              
              
            </tr>
          </thead>
          <tbody>
            {/* {users &&
              users.map((user) => <UserDetails key={user._id} data={user} />)} */}
              <RequestDetails category={category}/>
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
}

// function formatDate(isoString) {
//   const date = new Date(isoString);

//   const day = String(date.getDate()).padStart(2, '0');
//   const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
//   const year = date.getFullYear();

//   return `${day}/${month}/${year}`;
// }

type ItemProps = {
  data: UserType;
  category: string;
};

const RequestDetails = ({  category }: ItemProps) => {

  return (
    <tr className="w-full">
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <div className="flex items-center justify-center">
          <div className="flex-shrink-0 justify-center">20/11/2002</div>
        </div>
      </td>
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 flex-row">
          
      
        <div className="flex justify-around align-middle text-center items-center"><Avatar
            image={createUrl('https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659651_1280.png')}
            shape="circle"
            size="normal"
            className="border-2 justify-stretch border-green-600"
          /> Ujjwal Aggarwal</div>
      </td>
      <td className="px-5  py-5 text-sm bg-white border-b border-gray-200">
        <div className="flex justify-center">email</div>
      </td>
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <div className="flex justify-center">phone</div>
      </td>
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <div className="flex justify-center">referalpoints</div>
      </td>
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <div className="flex justify-center">refund amount</div>
      </td>
      {category== 'Current'?<td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <div className="flex gap-2 justify-around align-middle items-center">
          <button
            type="button"
            className="flex justify-center items-center  bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white transition ease-in  duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 w-8 h-8 rounded-lg "
          >
            <RiCheckLine color="white" />
          </button>
          <button
            type="button"
            className="flex justify-center items-center  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white transition ease-in  duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 w-8 h-8 rounded-lg "
          >
            <RxCross2 color="white" />
          </button>
        </div>
      </td>:''}
      
    </tr>
  );
};

export default ReferalRefund;
