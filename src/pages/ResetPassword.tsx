import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import logo from '../assets/logo.png';
import { showToast } from '@/helper/functions';
import endpoints from '@/api-util/endpoints';
import axiosInstance from '@/api-util/api';

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState({
    input1: '',
    input2: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleReset = async () => {
    if (password.input1 === '' || password.input2 === '') {
      showToast('Please enter valid password', 'warn');
      return;
    }
    if (password.input1 !== password.input2) {
      showToast("Password doesn't match", 'error');
      return;
    }

    if (!token) {
      showToast('Invalid password reset link', 'error');
      return;
    }

    await axiosInstance({
      method: 'post',
      url: `${endpoints.auth.passwordReset}`,
      data: {
        token,
        newPassword: password.input1,
      },
    });

    setPassword({
      input1: '',
      input2: '',
    });
  };

  return (
    <div className="flex justify-center w-screen h-screen">
      <div className="max-w-sm w-3/4 mt-16 bg-slate-100 p-4 rounded-2xl h-fit">
        <img src={logo} className="w-24 m-auto" />
        <p className="text-2xl font-bold text-center my-8">
          Reset your password
        </p>
        <div className="relative justify-center flex flex-col">
          <input
            type="password"
            id="rounded-email"
            className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="New password"
            required={true}
            name="input1"
            onChange={(e) => handleChange(e)}
            value={password.input1}
          />
          <input
            type="text"
            id="rounded-email"
            className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent my-4"
            required={true}
            placeholder="Re-enter password"
            name="input2"
            onChange={(e) => handleChange(e)}
            value={password.input2}
          />

          <button
            onClick={handleReset}
            className="px-6 py-2 mt-4 transition ease-in duration-200 uppercase rounded-full hover:bg-purple-600 hover:text-white border-2 border-purple-600 text-purple-600 focus:outline-none m-auto"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
