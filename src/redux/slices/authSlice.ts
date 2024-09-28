import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthType, UserObjType } from '../../types';

type AuthReqType = {
  authToken: string | null;
  userType: string | null;
  details?: UserObjType;
};

const initialState: AuthReqType = {
  authToken: null,
  userType: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthReqType>) => {
      state.authToken = action.payload.authToken;
      state.userType = action.payload.userType;
      state.details = action.payload.details;
    },
    setAuth: (state, action: PayloadAction<AuthType>) => {
      state.authToken = action.payload.authToken;
    },

    userLoginAction: () => {},
  },
});

export const { setAuth, setUser, userLoginAction } = userSlice.actions;

export default userSlice.reducer;
