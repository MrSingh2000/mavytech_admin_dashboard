import { useState } from 'react';
import noImage from '../../assets/noImage.png';
import { LearningVideo } from '@/types';
import { useDispatch } from 'react-redux';
import { deleteLearningVideoAction } from '@/redux/slices/learningSlice';
import ModalPopup from '../ModalPopup';
import { MdOutlineDelete } from 'react-icons/md';
import { fetchLearningThumbnail } from '@/helper/functions';

type Props = {
  data: LearningVideo;
};

function VideoCard({ data }: Props) {
  const dispatch = useDispatch();
  const [confirmationModalVisible, setConfirmationModalVisible] =
    useState<boolean>(false);

  const handleDelete = () => {
    dispatch({ type: deleteLearningVideoAction.type, payload: data._id });
  };

  return (
    <>
      <div className="bg-success20percent rounded-lg flex items-center justify-between pr-3">
        <div className="flex items-center w-3/4">
          <img
            src={fetchLearningThumbnail(data.link) || noImage}
            alt="no img"
            className="w-20 p-2"
          />
          <div>
            <p className="font-semibold">{data.title}</p>
            <p className="text-sm line-clamp-2">{data.description}</p>
          </div>
        </div>
        <div className="w-1/4">
          <p>
            <span className="font-semibold text-xs">Equipment: </span>
            <span className="text-sm">{data.equipmentRelated}</span>
          </p>
          <p className="flex items-center gap-2">
            <span className="font-semibold text-xs">Model: </span>
            <span className="text-sm line-clamp-1">{data.modelRelated}</span>
          </p>
          <p>
            <span className="font-semibold text-xs">Price: </span>
            <span className="text-sm">
              {data.paid ? `₹${data.price}` : 'Free'}
            </span>
          </p>
          <div className="mt-2 flex">
            <button
              onClick={() => window.open(`https://youtu.be/${data.link}`, '_blank')}
              type="button"
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 w-full py-1.5 text-center me-2 mb-2"
            >
              Url
            </button>
            <button
              onClick={() => setConfirmationModalVisible(true)}
              type="button"
              className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 w-full py-1.5 text-center me-2 mb-2"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      {confirmationModalVisible && (
        <ModalPopup
          setModalVisible={setConfirmationModalVisible}
          buttons={['Delete', 'Cancel']}
          onConfirm={handleDelete}
          buttonStyleClass={[
            'bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200',
          ]}
        >
          <MdOutlineDelete size={70} className="m-auto mb-4" color="red" />
          <p className="text-center">
            Do you want to delete <i className="text-sm">'{data.title}'</i>
          </p>
        </ModalPopup>
      )}
    </>
  );
}

export default VideoCard;
