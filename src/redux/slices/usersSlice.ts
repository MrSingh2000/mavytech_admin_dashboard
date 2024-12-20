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
    toggleUserDisableAction: () => {},
    deleteUserAction: () => {},
  },
});

export const {
  getUsersAction,
  updateUserAction,
  setUsers,
  deleteUserAction,
  toggleUserDisableAction,
} = usersSlice.actions;

export default usersSlice.reducer;
