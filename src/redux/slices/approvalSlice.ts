import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApprovalType } from '../../types';

type StateType = {
  allApproval: ApprovalType[];
  selectedApproval: ApprovalType | null;
};

const initialState: StateType = {
  allApproval: [],
  selectedApproval: null,
};

const approvalSlice = createSlice({
  name: 'approval',
  initialState,
  reducers: {
    getApprovalsAction: (state, action) => {
      state.allApproval = action.payload; // Update the state with the fetched data
    },
    updateApprovalsAction: () => {},
  },
});

export const { getApprovalsAction, updateApprovalsAction } = approvalSlice.actions;

export default approvalSlice.reducer;
