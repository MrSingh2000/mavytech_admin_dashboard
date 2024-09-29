import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserType } from '../../types';

type StateType = {
  allUser: UserType[];
  selectedUser: UserType | null;
};

const initialState: StateType = {
  allUser: [],
  selectedUser: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.allUser = action.payload;
    },

    getUsersAction: () => {},
    updateUserAction: () => {},
    searchUserAction: () => {},
  },
});

export const {
  getUsersAction,
  updateUserAction,
  searchUserAction,
  setUsers,
} = usersSlice.actions;

export default usersSlice.reducer;