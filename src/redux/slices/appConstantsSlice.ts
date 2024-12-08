import { AppConstantsType } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: AppConstantsType & {
  updatedAt: string;
} = {
  minimalWithdrawalAmount: 0,
  referralAwardPoints: 0,
  rewardPointEquivalent: 0,
  subTier1Price: 0,
  subTier2Price: 0,
  subTier3Price: 0,
  subTier4Price: 0,
  updatedAt: '',
  learningOffer: {
    discount: 0,
    description: '',
    title: '',
  },
};

const appConstantsSlice = createSlice({
  name: 'appConstants',
  initialState,
  reducers: {
    setAppCostants: (state, action: PayloadAction<AppConstantsType>) => {
      return { ...state, ...action.payload };
    },
    getAppContantsAction: () => {},
    updateAppConstantsAction: () => {},
  },
});

export const {
  getAppContantsAction,
  setAppCostants,
  updateAppConstantsAction,
} = appConstantsSlice.actions;

export default appConstantsSlice.reducer;
