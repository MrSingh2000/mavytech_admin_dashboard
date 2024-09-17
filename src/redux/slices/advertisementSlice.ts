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
    updateAdvertisements: (state, action: PayloadAction<AdvertisementType[]>) => {
      state.allAdvertisement = action.payload;
    },
    getAdvertisementsAction: () => {},
    createAdvertisementAction: () => {},
    deleteAdvertisementAction: () => {},
  },
});

export const {
  getAdvertisementsAction,
  updateAdvertisements,
  createAdvertisementAction,
  deleteAdvertisementAction,
} = advertisementSlice.actions;

export default advertisementSlice.reducer;
