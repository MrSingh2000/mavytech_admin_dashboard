import { createUrl } from '@/helper/functions';
import { WithdrawalRequestType, WithdrawalTransactionType } from '@/types';
import { Avatar } from 'primereact/avatar';
import { RiCheckLine } from 'react-icons/ri';
import { RxCross2 } from 'react-icons/rx';
import { DateTime } from 'luxon';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import ConfirmationCard from '../ConfirmationCard';
import { FaRegCheckCircle } from 'react-icons/fa';
import { MdOutlineDelete } from 'react-icons/md';
import { updateWithdrawalRequestAction } from '@/redux/slices/withdrawalRequestSlice';

type Props = {
  data: WithdrawalRequestType;
  currentRequest: WithdrawalTransactionType;
};

function CurrentRequest({ data, currentRequest }: Props) {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState<{
    visible: boolean;
    buttonTexts: [string, string];
    description: string;
    title: string;
    icon: JSX.Element;
    completed: boolean;
  }>({
    buttonTexts: ['Cancel', 'Confirm'],
    completed: false,
    description: 'Here',
    icon: <FaRegCheckCircle size={50} />,
    title: '',
    visible: false,
  });

  return (
    <>
      {showModal.visible && (
        <ConfirmationCard
          buttonTexts={showModal.buttonTexts}
          description={showModal.description}
          handleCancel={() =>
            setShowModal((prev) => {
              return { ...prev, visible: false };
            })
          }
          handleConfirm={() => {
            dispatch({
              type: updateWithdrawalRequestAction.type,
              payload: {
                transactionId: currentRequest._id,
                userId: data.userId,
                completed: showModal.completed,
              },
            });
            setShowModal((prev) => {
              return { ...prev, visible: false };
            });
          }}
          title={showModal.title}
          HeaderIcon={showModal.icon}
        />
      )}
      <tr className="w-full">
        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
          <div className="flex items-center justify-center">
            <div className="flex-shrink-0 justify-center">
              {DateTime.fromISO(data.createdAt).toFormat('dd-MM-yy')}
            </div>
          </div>
        </td>
        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 flex-row">
          <div className="flex justify-around align-middle text-center items-center gap-2 flex-col">
            <Avatar
              image={createUrl(data.user.imageUrl)}
              shape="circle"
              size="normal"
              className="border-2 justify-stretch border-green-600"
            />
            {data.user.name}
          </div>
        </td>
        <td className="py-5 text-sm bg-white border-b border-gray-200">
          <div className="max-w-full whitespace-normal break-words">
            <p className="text-center">{data.user.email}</p>
          </div>
        </td>
        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
          <div className="flex justify-center">
            {data.user.phone
              ? `${data.user.phone?.code}${data.user.phone?.number}`
              : 'none'}
          </div>
        </td>
        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
          <div className="flex justify-center">{currentRequest.amount}</div>
        </td>
        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
          <div className="flex gap-2 justify-around align-middle items-center">
            <button
              onClick={() =>
                setShowModal((prev) => {
                  return {
                    ...prev,
                    buttonTexts: ['Cancel', 'Complete'],
                    completed: true,
                    description: `Are you sure to complete this transaction of ₹${currentRequest.amount}`,
                    icon: <FaRegCheckCircle size={50} color="#16A34A" />,
                    title: 'Complete Request',
                    visible: true,
                  };
                })
              }
              type="button"
              className="flex justify-center items-center  bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white transition ease-in  duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 w-8 h-8 rounded-lg "
            >
              <RiCheckLine color="white" />
            </button>
            <button
              onClick={() =>
                setShowModal((prev) => {
                  return {
                    ...prev,
                    buttonTexts: ['Cancel', 'Delete'],
                    completed: false,
                    description: `Are you sure to reject this transaction of ₹${currentRequest.amount}`,
                    icon: <MdOutlineDelete size={50} color="#DC2626" />,
                    title: 'Reject Request',
                    visible: true,
                  };
                })
              }
              type="button"
              className="flex justify-center items-center  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white transition ease-in  duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 w-8 h-8 rounded-lg "
            >
              <RxCross2 color="white" />
            </button>
          </div>
        </td>
      </tr>
    </>
  );
}

export default CurrentRequest;
