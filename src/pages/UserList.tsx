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

function UserList() {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.allUser);

  useEffect(() => {
    dispatch(getUsersAction());
  }, [dispatch]);

  return (
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
                Create Date
              </th>
              <th
                scope="col"
                className="px-5 py-3 text-sm font-semibold text-center text-gray-800 uppercase bg-white border-b border-gray-200"
              >
                Image
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
                State
              </th>
              <th
                scope="col"
                className="px-5 py-3 text-sm font-semibold text-center text-gray-800 uppercase bg-white border-b border-gray-200"
              >
                Country
              </th>

              <th
                scope="col"
                className="px-5 py-3 text-sm font-semibold text-center text-gray-800 uppercase bg-white border-b border-gray-200"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => <UserDetails key={user._id} data={user} />)}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function formatDate(isoString) {
  const date = new Date(isoString);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

type ItemProps = {
  data: UserType;
};

const UserDetails = ({ data }: ItemProps) => {
  const [visible, setVisible] = useState(false);
  const [selectedState, setSelectedState] = useState<string>('');
  const [countryOptions, setCountryOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [stateOptions, setStateOptions] = useState<
    { label: string; value: string }[]
  >([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const countryOptions = Object.keys(countriesData).map((country) => ({
      label: country,
      value: country,
    }));
    setCountryOptions(countryOptions);
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      const states = countriesData[selectedCountry] || [];
      const stateOptions = states.map((state) => ({
        label: state,
        value: state,
      }));
      setStateOptions(stateOptions);
    } else {
      setStateOptions([]);
    }
  }, [selectedCountry]);

  const handleSave = async () => {
    const updatedData = {
      country: selectedCountry,
      state: selectedState,
    };

    dispatch({
      type: updateUserAction.type,
      payload: { data: updatedData, id: data._id },
    });

    setVisible(false);
  };

  return (
    <tr className="w-full">
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            {data.createdAt ? formatDate(data.createdAt) : 'N/A'}
          </div>
        </div>
      </td>
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <p className="text-gray-900 whitespace-no-wrap text-center">
          <Avatar
            image={data.imageUrl ? createUrl(data.imageUrl) : ''}
            shape="circle"
            size="xlarge"
            className="border-2 justify-stretch border-green-600"
          />
        </p>
      </td>
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <div className="flex justify-center">{data.name || 'N/A'}</div>
      </td>
      <td className="pl-5 pr-2 py-5 text-sm bg-white border-b border-gray-200">
        <div className="flex justify-center">
          {typeof data.email === 'string' ? data.email : 'N/A'}
        </div>
      </td>
      <td className="py-5 pl-5 pr-2 text-sm bg-white border-b border-gray-200">
        <div className="flex justify-center">
          {typeof data.phone === 'string' ? data.phone : 'N/A'}
        </div>
      </td>
      <td className="py-5 pl-5 pr-2 text-sm bg-white border-b border-gray-200">
        <div className="flex justify-center">
          {typeof data.state === 'string' ? data.state : 'N/A'}
        </div>
      </td>
      <td className="py-5 pl-5 pr-2 text-sm bg-white border-b border-gray-200">
        <div className="flex justify-center">
          {typeof data.country === 'string' ? data.country : 'N/A'}
        </div>
      </td>

      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <div className="flex gap-2">
          <button
            onClick={() => setVisible(true)}
            type="button"
            className="flex justify-center items-center bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 w-8 h-8 rounded-lg"
          >
            <FaPencilAlt color="white" />
          </button>
        </div>
      </td>

      <Dialog
        visible={visible}
        modal
        headerClassName="h-2"
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        <div className="justify-center w-80 align-middle items-center">
          <div className="pb-10">
            <p className="text-2xl text-center">Update User Information</p>
            <p className="text-sm text-textLight text-center">
              Add or edit State and Country of User
            </p>
          </div>
          <div className="bg-white/45 flex max-w-[35rem] rounded-xl m-auto justify-center gap-y-4 flex-col p-5">
            <div className="flex flex-col w-full">
              <div className="relative">
                <label>Target Countries</label>
                <Dropdown
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.value)}
                  options={countryOptions}
                  optionLabel="label"
                  className="rounded-lg mt-2 overflow-ellipsis border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-sm"
                  placeholder="Select a Country"
                />
              </div>
            </div>
            <div className="flex flex-col w-full">
              <div className="relative">
                <label>Target States</label>
                <Dropdown
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.value)}
                  options={stateOptions}
                  optionLabel="label"
                  className="rounded-lg mt-2 overflow-ellipsis border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-sm"
                  placeholder="Select a State"
                />
              </div>
            </div>

            <div className="flex w-full">
              <button
                onClick={handleSave}
                className="mt-4 py-2 px-4 flex justify-center items-center bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </tr>
  );
};

export default UserList;
