import VideoCard from '@/components/learning/VideoCard';
import ModalPopup from '@/components/ModalPopup';
import { showToast } from '@/helper/functions';
import {
  addLearningVideoAction,
  getLearningDataAction,
  getLearningVideosAction,
} from '@/redux/slices/learningSlice';
import { RootState } from '@/redux/store';
import { LearningPlaylist, LearningVideo } from '@/types';
import React, { useEffect, useState } from 'react';
import { GoPlusCircle } from 'react-icons/go';
import { IoMdCloudUpload } from 'react-icons/io';
import { IoIosLink } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';

function Learning() {
  const dispatch = useDispatch();

  const learningData = useSelector((store: RootState) => store.learning);

  // eslint-disable-next-line
  const [currentSection, setCurrentSection] = useState<'video' | 'playlist'>(
    'video'
  );
  const [currentData, setCurrentData] = useState<{
    data: LearningVideo[] | LearningPlaylist[];
    meta?: {
      total: number;
      page: string;
      limit: string;
      totalPages: number;
    };
  }>(learningData.videos);

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    equipmentRelated: string;
    modelRelated: string;
    paid: boolean;
    price: number;
    link: string;
  }>({
    title: '',
    description: '',
    equipmentRelated: '',
    modelRelated: '',
    paid: true,
    price: 0,
    link: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.name === 'paid') {
      const { name, checked } = (e as React.ChangeEvent<HTMLInputElement>)
        .target;
      setFormData((prev) => {
        return { ...prev, [name]: checked };
      });
    } else
      setFormData((prev) => {
        return {
          ...prev,
          [e.target.name]:
            e.target.name === 'price' ? Number(e.target.value) : e.target.value,
        };
      });
  };

  const handleAddVideo = () => {
    if (
      !formData.title ||
      !formData.description ||
      !formData.equipmentRelated ||
      !formData.modelRelated ||
      !formData.link ||
      (formData.paid && formData.price <= 0)
    ) {
      showToast('Please fill the form correctly', 'error');
      return;
    }

    dispatch({ type: addLearningVideoAction.type, payload: formData });
    clearForm();
    setModalVisible(false);
  };

  const clearForm = () => {
    setFormData({
      title: '',
      description: '',
      equipmentRelated: '',
      modelRelated: '',
      paid: true,
      price: 0,
      link: '',
    });
  };

  const handleNextPagination = () => {
    dispatch({
      type: getLearningVideosAction.type,
      payload: {
        page: Number(currentData.meta?.page) + 1,
        limit: currentData.meta?.limit,
      },
    });
  };

  const handlePrevPagination = () => {
    dispatch({
      type: getLearningVideosAction.type,
      payload: {
        page: Number(currentData.meta?.page) - 1,
        limit: currentData.meta?.limit,
      },
    });
  };

  useEffect(() => {
    dispatch({ type: getLearningDataAction.type });
  }, []);

  useEffect(() => {
    if (currentSection === 'video') setCurrentData(learningData.videos);
    else setCurrentData(learningData.playlists);
  }, [currentSection, learningData]);

  return (
    <>
      <div className="w-full h-full overflow-hidden">
        {/* <ul className="m-1 text-md font-medium text-center text-gray-500 rounded-lg shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
          <li className="w-full focus-within:z-10">
            <button
              onClick={() => setCurrentSection('video')}
              className={`inline-block w-full p-4  border-s-0 border-gray-200 rounded-s-lg focus:ring-4 hover:bg-gray-50  focus:ring-green-500 focus:outline-none focus:bg-success20percent focus:text-success focus:font-bold ${
                currentSection === 'video'
                  ? 'bg-success20percent text-success font-bold'
                  : 'bg-white'
              }`}
            >
              Videos
            </button>
          </li>
          <li className="w-full focus-within:z-10">
            <button
              onClick={() => setCurrentSection('playlist')}
              className={`inline-block w-full p-4  border-e-0 border-gray-200 rounded-e-lg hover:bg-gray-50 focus:ring-4 focus:ring-green-500 focus:outline-none focus:bg-success20percent focus:text-success focus:font-bold ${
                currentSection === 'playlist'
                  ? 'bg-success20percent text-success font-bold'
                  : 'bg-white'
              }`}
            >
              Playlists
            </button>
          </li>
        </ul> */}
        <p className="text-2xl p-2 mb-4">Video Upload Center</p>
        <div className="m-auto bg-white rounded-xl w-full h-[75vh] p-3 overflow-y-auto">
          {/* Add button */}
          <div className="w-full h-fit flex justify-end">
            <button
              onClick={() => setModalVisible(true)}
              className="bg-white border-success border-2 shadow-lg w-[140px] p-2 h-fit rounded-xl flex gap-2 font-medium text-sm items-center fixed"
            >
              <GoPlusCircle size={25} /> Add {currentSection}
            </button>
          </div>

          {/* data */}
          <div className="my-2 gap-1 flex flex-col mt-14">
            {currentSection === 'video'
              ? learningData.videos.data.map((item) => (
                  <VideoCard key={item._id} data={item} />
                ))
              : null}
          </div>
        </div>
        <div className="flex flex-col items-center mt-3">
          <span className="text-sm text-gray-700 dark:text-gray-400">
            Showing{' '}
            <span className="font-semibold text-gray-900 dark:text-white">
              {(Number(currentData?.meta?.page) - 1) *
                Number(currentData?.meta?.limit) +
                1 || 0}
            </span>{' '}
            to{' '}
            <span className="font-semibold text-gray-900 dark:text-white">
              {Math.min(
                Number(currentData?.meta?.page) *
                  Number(currentData?.meta?.limit),
                Number(currentData?.meta?.total)
              ) || 0}
            </span>{' '}
            of{' '}
            <span className="font-semibold text-gray-900 dark:text-white">
              {currentData?.meta?.total || 0}
            </span>{' '}
            Entries
          </span>

          <div className="inline-flex mt-2 xs:mt-0">
            <button
              onClick={handlePrevPagination}
              disabled={Number(currentData?.meta?.page) === 1}
              className={`flex items-center justify-center px-3 h-8 text-sm font-medium text-black bg-white rounded-s hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                Number(currentData?.meta?.page) === 1
                  ? 'bg-gray-300 hover:bg-gray-300'
                  : ''
              }`}
            >
              <svg
                className="w-3.5 h-3.5 me-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 5H1m0 0 4 4M1 5l4-4"
                />
              </svg>
              Prev
            </button>
            <button
              onClick={handleNextPagination}
              disabled={
                currentData?.meta?.page === currentData?.meta?.totalPages
              }
              className={`flex items-center justify-center px-3 h-8 text-sm font-medium text-black bg-white border-0 border-s border-gray-700 rounded-e hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                currentData?.meta?.page === currentData?.meta?.totalPages
                  ? 'bg-gray-300 hover:bg-gray-300'
                  : ''
              }`}
            >
              Next
              <svg
                className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalVisible && (
        <ModalPopup
          containerStyleClass="min-w-[35vw]"
          setModalVisible={setModalVisible}
          buttons={['Add', 'Cancel']}
          onConfirm={() => {
            handleAddVideo();
          }}
        >
          {/* Image input */}
          <IoMdCloudUpload size={70} className="m-auto" color="#00B074" />

          <p className="mt-4 text-xl font-bold text-gray-800 dark:text-gray-200 text-center">
            Upload a video
          </p>
          <p className="text-xs">
            <b>Note: </b>Youtube video thumbnail will be used as default preview
            img
          </p>

          <form action="" className="flex flex-col gap-3 my-4 px-2">
            <div className=" relative ">
              <label htmlFor="name-with-label" className="text-gray-700">
                Title
              </label>
              <input
                onChange={(e) => handleChange(e)}
                type="text"
                id="name-with-label"
                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-400 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                name="title"
                placeholder="Your name"
                value={formData.title}
              />
            </div>

            <div className=" relative ">
              <label htmlFor="name-with-label" className="text-gray-700">
                Description
              </label>

              <textarea
                onChange={(e) => handleChange(e)}
                className="flex-1 w-full border-transparent shadow-sm px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                id="comment"
                placeholder="Enter your comment"
                name="description"
                rows={5}
                cols={40}
                value={formData.description}
              ></textarea>
            </div>

            <div className=" relative ">
              <label htmlFor="name-with-label" className="text-gray-700">
                Equipment
              </label>
              <input
                onChange={(e) => handleChange(e)}
                type="text"
                id="name-with-label"
                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-400 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                name="equipmentRelated"
                placeholder="Your name"
                value={formData.equipmentRelated}
              />
            </div>

            <div className=" relative ">
              <label htmlFor="name-with-label" className="text-gray-700">
                Model
              </label>
              <input
                onChange={(e) => handleChange(e)}
                type="text"
                id="name-with-label"
                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-400 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                name="modelRelated"
                placeholder="Your name"
                value={formData.modelRelated}
              />
            </div>

            <div className="flex relative">
              <span className="rounded-l-md inline-flex border-transparent items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm gap-2">
                <IoIosLink /> Video Id:
              </span>
              <input
                value={formData.link}
                type="text"
                onChange={(e) => handleChange(e)}
                id="with-email"
                className=" rounded-r-lg flex-1 border-transparent appearance-none border border-gray-400 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                name="link"
                placeholder="oe70Uhjc_F4"
              />
            </div>

            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                onChange={(e) => handleChange(e)}
                name="paid"
                className="hidden peer"
                checked={formData.paid}
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
              <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                {formData?.paid ? 'Paid' : 'Free'}
              </span>
            </label>

            {formData.paid && (
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Price
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">₹</span>
                  </div>
                  <input
                    onChange={(e) => handleChange(e)}
                    type="number"
                    name="price"
                    id="price"
                    className="block w-full px-4 border-transparent shadow-sm py-2 pr-12 border-t border-b border-l border-gray-300 rounded-md focus:ring-green-500 pl-7 sm:text-sm"
                    placeholder="0.00"
                    min={0}
                  />
                </div>
              </div>
            )}
          </form>
        </ModalPopup>
      )}
    </>
  );
}

export default Learning;
