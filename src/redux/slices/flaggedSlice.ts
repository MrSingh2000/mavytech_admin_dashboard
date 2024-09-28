import { createSlice} from '@reduxjs/toolkit';
import { FlaggedType } from '../../types';

type StateType = {
  services: FlaggedType[];
  sales: FlaggedType[];
  news: FlaggedType[];
  selectedFlagged: FlaggedType | null;
};

const initialState: StateType = {
  selectedFlagged: null,
  news: [],
  sales: [],
  services: [],
};

const flaggedSlice = createSlice({
  name: 'flagged',
  initialState,
  reducers: {
    setServicesFlags: (state, action) => {
      state.services = action.payload;
    },
    setSalesFlags: (state, action) => {
      state.sales = action.payload;
    },
    setNewsFlags: (state, action) => {
      state.news = action.payload;
    },
    getFlagsAction: () => {},
    rejectFlaggedAction: () => {},
    acceptFlaggedAction: () => {},
  },
});

export const {
  rejectFlaggedAction,
  acceptFlaggedAction,
  getFlagsAction,
  setNewsFlags,
  setSalesFlags,
  setServicesFlags,
} = flaggedSlice.actions;

export default flaggedSlice.reducer;
