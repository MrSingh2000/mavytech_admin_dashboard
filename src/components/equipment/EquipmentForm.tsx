import React, { useEffect, useRef, useState } from 'react';
import axiosInstance from '../../api-util/api';
import endpoints from '../../api-util/endpoints';
import { EquipmentType } from '../../types';
import { useDispatch } from 'react-redux';
import { getEquipmentsAction } from '../../redux/slices/equipmentSlice';

type Props = {
  selectedEquipment: EquipmentType | null;
  setSelectedEquipment: React.Dispatch<
    React.SetStateAction<EquipmentType | null>
  >;
};

function EquipmentForm({ selectedEquipment, setSelectedEquipment }: Props) {
  const [formData, setFormData] = useState<{
    name: string;
    machineModel: string;
    description: string;
  }>({
    name: '',
    machineModel: '',
    description: '',
  });

  const [files, setFiles] = useState<{
    image: File | null;
    userManual: File | null;
    serviceManual: File | null;
  }>({
    image: null,
    userManual: null,
    serviceManual: null,
  });

  const dispatch = useDispatch();
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleClearInput = () => {
    if (formRef.current) {
      formRef.current.reset(); // Clear the file input
    }
  };

  // in case of edit
  useEffect(() => {
    setFormData({
      name: selectedEquipment?.name ?? '',
      machineModel: selectedEquipment?.machineModel ?? '',
      description: selectedEquipment?.description ?? '',
    });
  }, [selectedEquipment]);

  const handleChange = (e: any) => {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleFileChange = (e: any) => {
    const { name, files } = e.target;
    setFiles((prevFiles) => ({
      ...prevFiles,
      [name]: files[0], // For single file uploads
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const data = new FormData();
    // Append JSON data
    data.append('name', formData.name);
    data.append('machineModel', formData.machineModel);
    data.append('description', formData.description);

    // Append file data
    if (files.image) data.append('image', files.image);
    if (files.userManual) data.append('userManual', files.userManual);
    if (files.serviceManual) data.append('serviceManual', files.serviceManual);

    await axiosInstance({
      url: `${import.meta.env.VITE_SERVER_PORT}${
        selectedEquipment
          ? `${endpoints.equipment.update}/${selectedEquipment._id}`
          : endpoints.equipment.create
      }`,
      method: selectedEquipment ? 'put' : 'post',
      data,
    });

    dispatch({ type: getEquipmentsAction.type });
  };

  return (
    <>
      <div className="pb-10">
        <p className="text-2xl">Equipment panel</p>
        <p className="text-sm text-textLight">
          Add or edit equipments in the inventory
        </p>
      </div>
      <form
        ref={formRef}
        className="bg-white/45 flex max-w-[35rem] rounded-xl m-auto justify-center flex-col p-5"
      >
        <div className="flex flex-wrap justify-between  gap-y-5">
          <Input
            handleChange={handleChange}
            label="Machine title"
            name="name"
            placeholder="Open clave"
            value={formData.name}
          />
          <Input
            handleChange={handleChange}
            label="Machine model"
            name="machineModel"
            placeholder="12A-890"
            value={formData.machineModel}
          />

          <label className="text-gray-700 flex-grow" htmlFor="name">
            <label htmlFor="required-email" className="text-gray-700">
              Description
              <span className="text-red-500 required-dot">*</span>
            </label>
            <textarea
              className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              placeholder="Machine description here"
              name="description"
              rows={5}
              cols={40}
              onChange={(e) => handleChange(e)}
              value={formData.description}
            ></textarea>
          </label>

          <div className="w-full max-w-60">
            <label
              htmlFor="image"
              className="block text-sm text-gray-500 dark:text-gray-300"
            >
              Machine image{' '}
              <span className="text-xs text-success">
                {selectedEquipment?.image && !files.image
                  ? '(Already exists)'
                  : ''}
              </span>
            </label>
            <input
              type="file"
              accept="image/*"
              className="block w-full px-3 py-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
              name="image"
              onChange={handleFileChange}
            />
          </div>

          <div className="w-full max-w-60">
            <label
              htmlFor="image"
              className="block text-sm text-gray-500 dark:text-gray-300"
            >
              User manual{' '}
              <span className="text-xs text-success">
                {selectedEquipment?.userManual && !files.userManual
                  ? '(Already exists)'
                  : ''}
              </span>
            </label>
            <input
              type="file"
              accept="application/pdf"
              className="block w-full px-3 py-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
              name="userManual"
              onChange={handleFileChange}
            />
          </div>

          <div className="w-full max-w-60">
            <label
              htmlFor="image"
              className="block text-sm text-gray-500 dark:text-gray-300"
            >
              Service manual{' '}
              <span className="text-xs text-success">
                {selectedEquipment?.serviceManual && !files.serviceManual
                  ? '(Already exists)'
                  : ''}
              </span>
            </label>
            <input
              type="file"
              accept="application/pdf"
              name="serviceManual"
              onChange={handleFileChange}
              className="block w-full px-3 py-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
            />
          </div>
        </div>
        <button
          type="button"
          className="mt-4 py-2 px-4 flex justify-center items-center  bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg"
          onClick={handleSubmit}
        >
          <svg
            width="20"
            height="20"
            fill="currentColor"
            className="mr-2"
            viewBox="0 0 1792 1792"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1344 1472q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm256 0q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm128-224v320q0 40-28 68t-68 28h-1472q-40 0-68-28t-28-68v-320q0-40 28-68t68-28h427q21 56 70.5 92t110.5 36h256q61 0 110.5-36t70.5-92h427q40 0 68 28t28 68zm-325-648q-17 40-59 40h-256v448q0 26-19 45t-45 19h-256q-26 0-45-19t-19-45v-448h-256q-42 0-59-40-17-39 14-69l448-448q18-19 45-19t45 19l448 448q31 30 14 69z"></path>
          </svg>
          {selectedEquipment ? 'Update' : 'Save'}
        </button>
        {selectedEquipment && (
          <button
            type="button"
            className="mt-4 py-2 px-4 flex justify-center items-center  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-blue-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg"
            onClick={() => {
              setSelectedEquipment(null);
              handleClearInput();
            }}
          >
            Create new
          </button>
        )}
      </form>
      <div></div>
    </>
  );
}

type InputProps = {
  label: string;
  placeholder: string;
  name: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

const Input = ({
  label,
  name,
  placeholder,
  handleChange,
  value,
}: InputProps) => {
  return (
    <div className="relative w-full max-w-60 flex flex-col">
      <label htmlFor="required-email" className="text-gray-700">
        {label}
        <span className="text-red-500 required-dot">*</span>
      </label>
      <input
        type="text"
        className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
        name={name}
        placeholder={placeholder}
        onChange={(e) => handleChange(e)}
        value={value}
      />
    </div>
  );
};

export default EquipmentForm;
