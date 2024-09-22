import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AdvertisementType } from '../../types';

type StateType = {
  allAdvertisement: AdvertisementType[];
  selectedAdvertisement: AdvertisementType | null;
};

const initialState: StateType = {
  allAdvertisement: [],
  selectedAdvertisement: null,
};

const advertisementSlice = createSlice({
  name: 'advertisement',
  initialState,
  reducers: {
    setAdvertisements: (state, action) => {
      state.allAdvertisement = action.payload;
    },
    updateAdvertisementAction:() => {},
    getAdvertisementsAction: () => {},
    createAdvertisementAction: () => {},
    deleteAdvertisementAction: () => {},
  },
});

export const {
  getAdvertisementsAction,
  updateAdvertisementAction,
  createAdvertisementAction,
  deleteAdvertisementAction,
  setAdvertisements,
} = advertisementSlice.actions;

export default advertisementSlice.reducer;
