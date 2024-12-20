import { Avatar } from 'primereact/avatar';
import { Dialog } from 'primereact/dialog';
import { useEffect, useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { Dropdown } from 'primereact/dropdown';
import { RootState } from '../redux/store';
import countriesData from '../components/addAdvertisements/countries.json';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteUserAction,
  getUsersAction,
  toggleUserDisableAction,
  updateUserAction,
} from '../redux/slices/usersSlice';
import { createUrl, showToast } from '../helper/functions';
import { UserType } from '../types';
import { FaDownload } from 'react-icons/fa6';
import axiosInstance from '@/api-util/api';
import endpoints from '@/api-util/endpoints';
import { FaSearch } from 'react-icons/fa';
import { LOCATIONS } from '@/utils/location';
import NoData from './NoData';
import { TbLockOff } from 'react-icons/tb';
import { MdDeleteOutline } from 'react-icons/md';
import ConfirmationCard from '@/components/ConfirmationCard';

function UserList() {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.allUser);

  const [searchParams, setSearchParams] = useState<{
    name: string;
    country: string;
    city: string;
  }>({
    city: '',
    country: '',
    name: '',
  });
  const [cityOptions, setCityOptions] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<UserType[]>([]);

  const handleSearch = async () => {
    const response = await axiosInstance({
      url: `${endpoints.users.search}?name=${searchParams.name}&country=${searchParams.country}&state=${searchParams.city}`,
    });

    setSearchResults(response?.data?.value ?? []);
    console.log('search: ', response.data.value);
  };

  const downloadExcel = async () => {
    try {
      showToast('Started downloading, please wait', 'info');
      const response = await axiosInstance.get(endpoints.users.downloadxls, {
        responseType: 'blob',
      });
      // Create a URL for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Create an anchor element to trigger the download
      const a = document.createElement('a');
      a.href = url;
      a.download = 'data.xlsx'; // Set the desired file name
      document.body.appendChild(a);
      a.click();
      a.remove();

      // Cleanup the blob URL
      window.URL.revokeObjectURL(url);
      showToast('Download successfull', 'success');
    } catch (error: any) {
      console.log('Error while downloading xls: ', error);
      showToast('Error while downloading data', 'error');
    }
  };

  useEffect(() => {
    dispatch(getUsersAction());
  }, [dispatch]);

  useEffect(() => {
    if (searchParams.country) setCityOptions(LOCATIONS[searchParams.country]);
    handleSearch();
  }, [searchParams]);

  return (
    <div className="overflow-hidden w-full">
      <div className="w-full flex items-center justify-between">
        <button
          onClick={downloadExcel}
          type="button"
          className="gap-2 m-4 py-2 px-4 flex justify-center items-center  bg-green-500 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full"
        >
          <FaDownload />
          Download xls
        </button>

        <div className="flex m-4 gap-4 flex-wrap max-w-1/2">
          <div className="flex h-fit">
            <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
              <FaSearch />
            </span>
            <input
              onChange={(e) =>
                setSearchParams((prev) => {
                  return {
                    ...prev,
                    name: e.target.value,
                  };
                })
              }
              type="text"
              id="email-with-icon"
              className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              name="email"
              placeholder="Search"
            />
          </div>
          <div className="gap-4 flex flex-col">
            <Dropdown
              showClear={searchParams.country !== ''}
              value={searchParams.country}
              onChange={(e) =>
                setSearchParams((prev) => {
                  return {
                    ...prev,
                    country: e.value,
                    city: '',
                  };
                })
              }
              options={Object.keys(LOCATIONS)}
              optionLabel="name"
              panelClassName="p-1"
              placeholder="Select a Country"
              className="w-48 md:w-14rem h-fit p-2 m-auto flex items-center justify-center"
            />

            <Dropdown
              showClear={searchParams.city !== ''}
              value={searchParams.city}
              onChange={(e) =>
                setSearchParams((prev) => {
                  return {
                    ...prev,
                    city: e.value,
                  };
                })
              }
              disabled={!searchParams.country}
              options={cityOptions}
              optionLabel="name"
              panelClassName="p-1"
              placeholder="Select a City"
              className="w-48 md:w-14rem h-fit p-2 m-auto"
            />
          </div>
        </div>
      </div>

      <div
        className="inline-block min-w-full overflow-hidden rounded-lg shadow"
        style={{
          height: '62vh',
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
            !searchParams.city &&
            !searchParams.country &&
            !searchParams.name ? (
              users.map((user) => <UserDetails key={user._id} data={user} />)
            ) : searchResults.length > 0 ? (
              searchResults.map((user) => (
                <UserDetails key={user._id} data={user} />
              ))
            ) : (
              <div className="relative left-[30vw] top-10">
                <NoData />
              </div>
            )}
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
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
  const [disableUserModalVisible, setDisableUserModalVisible] =
    useState<boolean>(false);
  const [selectedState, setSelectedState] = useState<string>('');
  const [countryOptions, setCountryOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [stateOptions, setStateOptions] = useState<
    { label: string; value: string }[]
  >([]);

  const handleSave = () => {
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

  const handleToggleDisable = () => {
    dispatch({
      type: toggleUserDisableAction.type,
      payload: {
        disable: !data.accountDisabled,
        userId: data._id,
      },
    });
    setDisableUserModalVisible(false);
  };

  const handleDelete = () => {
    dispatch({
      type: deleteUserAction.type,
      payload: {
        userId: data._id,
      },
    });
    setDeleteModalVisible(false);
  };

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
          <button
            onClick={() => setDisableUserModalVisible(true)}
            type="button"
            className={`flex justify-center items-center ${
              data.accountDisabled
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-white hover:bg-gray-200'
            }  focus:ring-green-500 focus:ring-offset-green-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 w-8 h-8 rounded-lg`}
          >
            <TbLockOff color={data.accountDisabled ? 'white' : 'black'} />
          </button>
          <button
            onClick={() => setDeleteModalVisible(true)}
            type="button"
            className="flex justify-center items-center bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 w-8 h-8 rounded-lg"
          >
            <MdDeleteOutline />
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

      {deleteModalVisible && (
        <ConfirmationCard
          buttonTexts={['Cancel', 'Delete']}
          description={`User account for "${data.name}" will be permanently deleted. Proceed?`}
          handleCancel={() => setDeleteModalVisible(false)}
          handleConfirm={handleDelete}
          title="Delete user"
          buttonClassName={[
            null,
            'bg-red-500 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white',
          ]}
        />
      )}

      {disableUserModalVisible && (
        <ConfirmationCard
          buttonTexts={['Cancel', data.accountDisabled ? 'Enable' : 'Disable']}
          description={`"${data.name}" will ${
            data.accountDisabled ? '' : 'not'
          } be able to access application services. Proceed?`}
          handleCancel={() => setDisableUserModalVisible(false)}
          handleConfirm={handleToggleDisable}
          title={data.accountDisabled ? 'Enable user' : 'Disable user'}
          buttonClassName={[
            null,
            'bg-red-500 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white',
          ]}
        />
      )}
    </tr>
  );
};

export default UserList;
