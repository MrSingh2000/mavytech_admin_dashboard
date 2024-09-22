import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { AuthType } from '../../types';

type AuthReqType = {
  authToken: string | null;
};

const initialState: AuthReqType = {
  authToken: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthType>) => {
      state.authToken = action.payload.authToken;
    },
    userLoginAction: (state, action: PayloadAction<{ email: string; password: string }>) => {},

  },
});

export const {
  setAuth,
  userLoginAction,
} = userSlice.actions;

export default userSlice.reducer;