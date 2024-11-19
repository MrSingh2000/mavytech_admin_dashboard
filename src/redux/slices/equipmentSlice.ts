import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EquipmentState, MachineType } from '../../types';

const initialState: EquipmentState = {
  data: [],
  totalRecords: 0,
  currentPage: 0,
  limit: 0,
  totalPages: 0,
  selectedEquipment: null,
};

const equipmentSlice = createSlice({
  name: 'equipment',
  initialState,
  reducers: {
    updateEquipments: (state, action: PayloadAction<{ equipment: MachineType[]; totalRecords: number, currentPage: number, limit: number, totalPages: number }>) => {
      state.data = action.payload.equipment;
      state.totalRecords = action.payload.totalRecords;
      state.currentPage = action.payload.currentPage;
      state.limit = action.payload.limit;
      state.totalPages = action.payload.totalPages;
    },
    getEquipmentsAction: (state, action: PayloadAction<{ page: number; limit: number }>) => {},
    createEquipmentAction: () => {},
    deleteEquipmentAction: () => {},
  },
});

export const {
  getEquipmentsAction,
  updateEquipments,
  createEquipmentAction,
  deleteEquipmentAction,
} = equipmentSlice.actions;

export default equipmentSlice.reducer;
