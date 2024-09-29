import { createSlice } from '@reduxjs/toolkit';
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
    setApprovals: (state, action) => {
      state.allApproval = action.payload; // Update the state with the fetched data
    },
    getApprovalsAction: () => {},
    updateApprovalsAction: () => {},
  },
});

export const { getApprovalsAction, setApprovals, updateApprovalsAction } = approvalSlice.actions;

export default approvalSlice.reducer;
