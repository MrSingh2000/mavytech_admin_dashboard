import {
  getAppContantsAction,
  updateAppConstantsAction,
} from '@/redux/slices/appConstantsSlice';
import { RootState } from '@/redux/store';
import { AppConstantsType } from '@/types';
import React, { useEffect, useState } from 'react';
import { IoIosSettings } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';

function Configuration() {
  const dispatch = useDispatch();
  const appConstantsRedux = useSelector(
    (store: RootState) => store.appConstants
  );
  const [config, setConfig] = useState<AppConstantsType>({
    minimalWithdrawalAmount: 0,
    referralAwardPoints: 0,
    rewardPointEquivalent: 0,
    subTier1Price: 0,
    subTier2Price: 0,
    subTier3Price: 0,
    subTier4Price: 0,
  });

  useEffect(() => {
    dispatch({ type: getAppContantsAction.type });
  }, []);

  useEffect(() => {
    setConfig(appConstantsRedux);
  }, [appConstantsRedux]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (isNaN(Number(e.target.value))) {
      alert('Invalid numerical value.');
      return;
    }

    setConfig((prev) => {
      return { ...prev, [e.target.name]: Number(e.target.value) };
    });
  };

  const areObjectsEqual = (
    obj1: AppConstantsType,
    obj2: AppConstantsType
  ): boolean => {
    for (const key in obj1) {
      if (obj1[key] !== obj2[key]) {
        return false; // Return false if any value is different
      }
    }
    return true; // Return true if all values match
  };

  const handleUpdate = (): void => {
    if (areObjectsEqual(config, appConstantsRedux)) {
      alert('Please update any value first.');
      return;
    }
    dispatch({
      type: updateAppConstantsAction.type,
      payload: config,
    });
  };

  return (
    <div className="bg-white w-full h-full rounded-xl">
      <p className="text-2xl p-2">App Configuration</p>
      <div className="max-w-[80%] m-auto mt-10">
        <div className="bg-bgGrey p-4 rounded-xl flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              handleChange={handleChange}
              name="minimalWithdrawalAmount"
              value={config.minimalWithdrawalAmount}
              label="Min. withdrawal amount"
            />
            <Input
              handleChange={handleChange}
              name="referralAwardPoints"
              value={config.referralAwardPoints}
              label="Referral award points"
            />
            <Input
              handleChange={handleChange}
              name="rewardPointEquivalent"
              value={config.rewardPointEquivalent}
              label="Reward point equivalent (in ₹)"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              handleChange={handleChange}
              name="subTier1Price"
              value={config.subTier1Price}
              label="Gold tier price (in ₹)"
            />
            <Input
              handleChange={handleChange}
              name="subTier2Price"
              value={config.subTier2Price}
              label="Diamond tier price (in ₹)"
            />
            <Input
              handleChange={handleChange}
              name="subTier3Price"
              value={config.subTier3Price}
              label="Platinum tier price (in ₹)"
            />
            <Input
              handleChange={handleChange}
              name="subTier4Price"
              value={config.subTier4Price}
              label="Mavian tier price (in ₹)"
            />
          </div>
        </div>

        <button
          onClick={handleUpdate}
          type="button"
          className="mt-10 py-2 px-4 flex justify-center items-center bg-green-500 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-full gap-2"
        >
          <IoIosSettings size={25} />
          Update
        </button>
      </div>
    </div>
  );
}

type InputProps = {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  value: number;
  label: string;
};

const Input: React.FC<InputProps> = ({ handleChange, name, value, label }) => {
  return (
    <div className=" relative ">
      <label htmlFor="name-with-label" className="text-gray-700">
        {label}
      </label>
      <input
        onChange={(e) => handleChange(e)}
        type="number"
        id="name-with-label"
        className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
        name={name}
        placeholder="Please enter a value"
        value={value}
      />
    </div>
  );
};

export default Configuration;
