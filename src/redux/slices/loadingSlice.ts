import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type LoadingState = {
  value: boolean;
};

const initialState: LoadingState = {
  value: false,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { setLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
