import { WithdrawalRequestType } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type State = {
  pending: WithdrawalRequestType[];
  completed: WithdrawalRequestType[];
  failed: WithdrawalRequestType[];
};

const initialState: State = {
  completed: [],
  failed: [],
  pending: [],
};

const withdrawalRequestSlice = createSlice({
  name: 'withdrawalRequest',
  initialState,
  reducers: {
    setWithdrawalRequest: (state, action: PayloadAction<State>) => {
      return { ...state, ...action.payload };
    },
    getWithdrawalRequestAction: () => {},
    updateWithdrawalRequestAction: () => {},
  },
});

export const {
  getWithdrawalRequestAction,
  setWithdrawalRequest,
  updateWithdrawalRequestAction,
} = withdrawalRequestSlice.actions;

export default withdrawalRequestSlice.reducer;
