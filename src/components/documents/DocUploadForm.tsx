import React, { useState } from 'react';
import image from "/src/assets/internet-network-communication-web-technology-computer-icon-vector-online-website-design_1013341-38101-removebg-preview (1).png";
import axiosInstance from '../../api-util/api';
import endpoints from '../../api-util/endpoints';


const DocUploadForm: React.FC = () => {
  const [formData, setFormData] = useState<{ title: string }>({
    title: '',
  });

  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>(''); // New state to store the file name

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file || !formData.title) {
      alert("Please provide a document name and a file.");
      return;
    }

    const data = new FormData();
    data.append('title', formData.title);
    data.append('document', file);

    await axiosInstance({
      url: `${ endpoints.document.create}`,
      method:  'post',
      data,
    });
  };

  return (
    <>
      <div className="pb-10">
        <p className="text-2xl">Documents panel</p>
        <p className="text-sm text-textLight">
          Add Documents in the inventory
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white/45 flex max-w-[27rem] rounded-xl m-auto justify-center gap-y-3 flex-col p-5"
      >
        <div className="flex flex-col mb-2">
          <label>Document Name</label>
          <input
            type="text"
            id="doc-name"
            className="rounded-lg border-gray-300 w-full mt-2 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600"
            name="title"
            placeholder="Enter document name"
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-44 p-10 group text-center">
            <div className="h-full w-full text-center flex flex-col items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-blue-400 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <div className="flex flex-auto justify-center max-h-48 w-2/5 mx-auto -mt-10">
                <img className="has-mask h-25 object-center" src={image} alt="icon" />
              </div>
              <p className="pointer-none text-gray-500">
                <span className="text-sm">Drag and drop</span> files here <br /> 
                or <a className="text-blue-600 hover:underline">select a file</a> from your computer
              </p>
            </div>
            <input 
              type="file" 
              className="hidden" 
              onChange={handleFileChange} 
              accept="application/pdf, application/vnd.ms-excel"
            />
          </label>
        </div>

        {fileName && ( // Conditionally display the file name
          <div className="mt-2 text-gray-700">
            Selected file: {fileName}
          </div>
        )}

        <div className="flex w-full my-4">
          <button
            type="submit"
            className="mt-4 py-2 px-4 flex justify-center items-center bg-green-600 hover:bg-green-700 text-white w-full rounded-lg"
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

export default DocUploadForm;
