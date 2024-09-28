import { createSlice } from '@reduxjs/toolkit';
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
  },
});

export const {
  getUsersAction,
  updateUserAction,
  setUsers,
} = usersSlice.actions;

export default usersSlice.reducer;