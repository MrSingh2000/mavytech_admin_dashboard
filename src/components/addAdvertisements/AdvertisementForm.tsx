import React, { useRef, useState, useEffect } from 'react';
import { MultiSelect } from 'primereact/multiselect';
import countriesData from './countries.json'; 
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/saga-green/theme.css';
import axiosInstance from '../../api-util/api';
import endpoints from '../../api-util/endpoints';
import { AdvertisementType } from '../../types';

type Props = {
  selectedAdvertisement: AdvertisementType | null;
  setSelectedAdvertisement: React.Dispatch<
    React.SetStateAction<AdvertisementType | null>
  >;
};

function AdvertisementForm({selectedAdvertisement, setSelectedAdvertisement}: Props){
  const initialFormData = {
    title: '',
    url: '',
    targetCity: [],
    targetCountry: []
  };

  const [formData, setFormData] = useState<{
    title: string;
    url: string;
    targetCity: string[];
    targetCountry: string[];
  }>(initialFormData);

  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>(''); // New state to store the file name
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Reference to the file input element

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setFileName(selectedFile.name); // Store the file name
    }
  };

  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [countryOptions, setCountryOptions] = useState<{ label: string; value: string }[]>([]);
  const [stateOptions, setStateOptions] = useState<{ label: string; value: string }[]>([]);

  useEffect(() => {
    // Transform JSON data into country options
    const countryOptions = Object.keys(countriesData).map((country) => ({
      label: country,
      value: country,
    }));
    setCountryOptions(countryOptions);
  }, []);

  useEffect(() => {
    // Transform city options based on selected countries
    const states = selectedCountries.flatMap(
      (country) => countriesData[country] || []
    );
    const stateOptions = states.map((state) => ({ label: state, value: state }));
    setStateOptions(stateOptions);
  }, [selectedCountries]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file || !formData.title || !formData.url || !formData.targetCity || !formData.targetCountry) {
      alert("Please fill the form properly.");
      return;
    }

    const data = new FormData();
    data.append('title', formData.title);
    data.append('url', formData.url);
    data.append('thumbnail', file);
    selectedStates.forEach((state) => {
      data.append('targetCity[]', state);
    });
    selectedCountries.forEach((country) => {
      data.append('targetCountry[]', country);
    });

    await axiosInstance({
      url: `${endpoints.advertisement.create}`,
      method: 'post',
      data,
    });

   

    // Reset form inputs
    setFormData(initialFormData);
    setFile(null);
    setFileName('');
    setSelectedCountries([]);
    setSelectedStates([]);

    // Clear the file input using ref
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Clear the file input value
    }
  };

  return (
    <>
      <div className="pb-10">
        <p className="text-2xl">Advertisement panel</p>
        <p className="text-sm text-textLight">Add or edit advertisements in the inventory</p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white/45 flex max-w-[35rem] rounded-xl m-auto justify-center gap-y-4 flex-col p-5"
      >
        <div className='flex flex-row gap-x-3'>
          <div className="flex flex-col">
            <div className="relative">
              <label>Advertisement Name</label>
              <input
                type="text"
                id="advertisement-name"
                className="rounded-lg mt-2 border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                name="title"
                placeholder="Enter name"
                onChange={handleInputChange}
                value={formData.title}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="relative">
              <label>Advertisement Url</label>
              <input
                type="url"
                id="advertisement-url"
                className="rounded-lg mt-2 border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                name="url"
                placeholder="https://"
                onChange={handleInputChange}
                value={formData.url}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className="relative">
            <label>Target Countries</label>
            <MultiSelect
              value={selectedCountries}
              onChange={(e) => setSelectedCountries(e.value)}
              options={countryOptions}
              optionLabel="label"
              filter
              placeholder="Select Countries"
              maxSelectedLabels={5}
              display="chip"
              itemClassName="bg-white"
              panelStyle={{ backgroundColor: 'white', fontSize: 'small', padding: '5px', borderRadius: 5 }}
              className="rounded-lg mt-2 overflow-ellipsis border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-sm"
            />
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className="relative">
            <label>Target States</label>
            <MultiSelect
              value={selectedStates}
              onChange={(e) => setSelectedStates(e.value)}
              options={stateOptions}
              optionLabel="label"
              filter
              variant="filled"
              placeholder="Select States"
              maxSelectedLabels={5}
              display="chip"
              className="rounded-lg mt-2 overflow-ellipsis border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-sm"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="relative">
            <label>Advertisement Thumbnail</label>
            <input
              type="file"
              accept="image/*"
              className="rounded-lg mt-2 file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full file:cursor-pointer border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              placeholder="Image"
              onChange={handleFileChange}
              ref={fileInputRef} // Attach ref to file input
            />
          </div>
          {fileName && (
            <div className="mt-2 text-gray-700">Selected file: {fileName}</div>
          )}
        </div>
        <div className="flex w-full">
          <button
            type="submit"
            className="mt-4 py-2 px-4 flex justify-center items-center bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
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
          </button>
        </div>
      </form>
    </>
  );
};

export default AdvertisementForm;
