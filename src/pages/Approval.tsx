import { useEffect } from 'react';
import noImage from '../assets/noImage.png';
import pdflogo from '../assets/icons8-pdf-100.png';
import { TiTick } from 'react-icons/ti';
import { RxCross2 } from 'react-icons/rx';
import { MdDoNotDisturb } from 'react-icons/md';
import { ApprovalType } from '../types';
import { createUrl } from '../helper/functions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { deleteEquipmentAction } from '../redux/slices/equipmentSlice';
import { Image } from 'primereact/image';
import {
  getApprovalsAction,
  updateApprovalsAction,
} from '../redux/slices/approvalSlice';



function Approval() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: getApprovalsAction.type });
  }, []);
  const approvals = useSelector(
    (store: RootState) => store.approval.allApproval
  );

  console.log(approvals);

  return (
    <div className="container ">
      <div className="py-8">
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
                    className="px-5 py-3 text-sm font-semibold text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                  >
                    Creation Date
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 text-sm font-semibold text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                  >
                    Machine Name
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 text-sm font-semibold text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                  >
                    Image
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 text-sm font-semibold text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                  >
                    Modal Name
                  </th>

                  <th
                    scope="col"
                    className="px-5 py-3 text-sm font-semibold text-gray-800 uppercase bg-white border-b border-gray-200 text-center"
                  >
                    User Manual
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 text-sm font-semibold text-center text-gray-800 uppercase bg-white border-b border-gray-200"
                  >
                    Service Manual
                  </th>

                  <th
                    scope="col"
                    className="px-5 py-3 text-sm font-semibold text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                  >
                    Approval
                  </th>
                </tr>
              </thead>
              <tbody>
                {approvals &&
                  approvals.map((item) => (
                    <ApprovalRecord data={item} key={item._id}/>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

type ItemProps ={
  data: ApprovalType;
};

function formatDate(isoString) {
  const date = new Date(isoString);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

const ApprovalRecord = ({ data }: ItemProps) => {
  const dispatch = useDispatch();

  const handleOpenPdf = (url: string) => {
    // Open the PDF in a new tab
    window.open(url, '_blank');
  };
  return (
    <tr>
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <div className="flex items-center">
          <div className="ml-3">
            <p className="text-gray-900 whitespace-no-wrap">
              {formatDate(data.createdAt)}
            </p>
          </div>
        </div>
      </td>
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <div className="flex items-center">
          <div className="ml-3">
            <p className="text-gray-900 whitespace-no-wrap">{data.name}</p>
          </div>
        </div>
      </td>
      <td className="px-5 py-5 text-sm justify-center bg-white border-b border-gray-200">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            {data.image ? (
              <Image
                src={createUrl(data.image)}
                alt="Image"
                width="84"
                height="40"
                preview
                className="text-white "
              />
            ) : (
              <Image src={noImage} alt="Image" width="84" height="40" />
            )}
          </div>
        </div>
      </td>
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <p className="text-gray-900 whitespace-no-wrap">{data.machineModel}</p>
      </td>
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <div className="flex justify-center">
          {data.userManual ? (
            <button
              onClick={() => handleOpenPdf(createUrl(data.userManual))}
              type="button"
              className="flex justify-center items-center  text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 w-12 h-12 rounded-lg "
            >
              <img src={pdflogo} />
            </button>
          ) : (
            <button
              style={{
                backgroundImage: `url(${pdflogo})`,
                backgroundSize: '48px 48px',
              }}
              type="button"
              disabled
              className=" flex justify-center items-center text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 w-12 h-12 rounded-lg "
            >
              <MdDoNotDisturb className="text-red-500 text-4xl" />
            </button>
          )}
        </div>
      </td>
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <div className="flex justify-center">
          {data.serviceManual ? (
            <button
              onClick={() => handleOpenPdf(createUrl(data.serviceManual))}
              type="button"
              className="flex justify-center items-center  text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 w-12 h-12 rounded-lg "
            >
              <img src={pdflogo} />
            </button>
          ) : (
            <button
              style={{
                backgroundImage: `url(${pdflogo})`,
                backgroundSize: '48px 48px',
              }}
              type="button"
              disabled
              className=" flex justify-center items-center text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 w-12 h-12 rounded-lg "
            >
              <MdDoNotDisturb className="text-red-500 text-4xl" />
            </button>
          )}
        </div>
      </td>
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 ">
        <div className="flex gap-2">
          <button
            onClick={() =>
              dispatch({ type: updateApprovalsAction.type, payload: data._id })
            }
            type="button"
            className="flex justify-center items-center  bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 w-8 h-8 rounded-lg "
          >
            <TiTick />
          </button>

          <button
            onClick={() =>
              dispatch({ type: deleteEquipmentAction.type, payload: data._id })
            }
            type="button"
            className="flex justify-center items-center  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 w-8 h-8 rounded-lg "
          >
            <RxCross2 />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default Approval;
