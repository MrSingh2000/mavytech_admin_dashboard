import { EquipmentType } from '../../types';
import { FaPencilAlt } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { FaDownload } from 'react-icons/fa6';
import { createUrl } from '../../helper/functions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import React from 'react';
import { IoWarning } from 'react-icons/io5';
import { FaFileImage } from 'react-icons/fa';
import { deleteEquipmentAction } from '../../redux/slices/equipmentSlice';

type Props = {
  setSelectedEquipment: React.Dispatch<
    React.SetStateAction<EquipmentType | null>
  >;
};

function EquipmentList(props: Props) {
  const equipments = useSelector(
    (store: RootState) => store.equipment.allEquipment
  );

  return (
    <div className="container max-w-3xl px-4 mx-auto sm:px-8">
      <div className="py-8">
        <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
          <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                  >
                    Image
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 text-sm font-normal text-center text-gray-800 uppercase bg-white border-b border-gray-200"
                  >
                    Desc.
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 text-sm font-normal text-gray-800 uppercase bg-white border-b border-gray-200 text-center"
                  >
                    Service manual
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 text-sm font-normal text-center text-gray-800 uppercase bg-white border-b border-gray-200"
                  >
                    User manual
                  </th>

                  <th
                    scope="col"
                    className="px-5 py-3 text-sm font-normal text-center text-gray-800 uppercase bg-white border-b border-gray-200"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {equipments &&
                  equipments.map((item) => (
                    <ListItem data={item} key={item._id} {...props} />
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

type ItemProps = Props & {
  data: EquipmentType;
};

const ListItem = ({ data, setSelectedEquipment }: ItemProps) => {
  const dispatch = useDispatch();

  const handleOpenPdf = (url: string) => {
    // Open the PDF in a new tab
    window.open(url, '_blank');
  };

  const handleEdit = () => {
    setSelectedEquipment(data);
  };

  return (
    <tr>
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            {data.image ? (
              <img
                alt="profil"
                src={createUrl(data.image)}
                className="mx-auto object-cover rounded-full h-10 w-10 "
              />
            ) : (
              <FaFileImage
                size={25}
                className="mx-auto object-cover h-10 w-10 p-1"
              />
            )}
          </div>
          <div className="ml-3">
            <p className="text-gray-900 whitespace-no-wrap">{data.name}</p>
          </div>
        </div>
      </td>
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <p className="text-gray-900 whitespace-no-wrap text-center">
          {data.description}
        </p>
      </td>
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <div className="flex justify-center">
          {data.userManual ? (
            <button
              type="button"
              className="flex justify-center items-center  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  w-8 h-8 rounded-lg "
              onClick={() => handleOpenPdf(createUrl(data.userManual))}
            >
              <FaDownload color="white" />
            </button>
          ) : (
            <IoWarning size={30} color="#ffcc00" />
          )}
        </div>
      </td>
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <div className="flex justify-center">
          {data.serviceManual ? (
            <button
              type="button"
              className="flex justify-center items-center  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  w-8 h-8 rounded-lg "
              onClick={() => handleOpenPdf(createUrl(data.userManual))}
            >
              <FaDownload color="white" />
            </button>
          ) : (
            <IoWarning size={30} color="#ffcc00" />
          )}
        </div>
      </td>
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 ">
        <div className="flex gap-2">
          <button
            type="button"
            className="flex justify-center items-center  bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 w-8 h-8 rounded-lg "
            onClick={handleEdit}
          >
            <FaPencilAlt color="white" />
          </button>

          <button
            type="button"
            className="flex justify-center items-center  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 w-8 h-8 rounded-lg "
            onClick={() =>
              dispatch({ type: deleteEquipmentAction.type, payload: data._id })
            }
          >
            <MdDeleteForever color="white" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default EquipmentList;
