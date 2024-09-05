import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EquipmentType } from '../../types';

type StateType = {
  allEquipment: EquipmentType[];
  selectedEquipment: EquipmentType | null;
};

const initialState: StateType = {
  allEquipment: [],
  selectedEquipment: null,
};

const equipmentSlice = createSlice({
  name: 'equipment',
  initialState,
  reducers: {
    updateEquipments: (state, action: PayloadAction<EquipmentType[]>) => {
      state.allEquipment = action.payload;
    },
    getEquipmentsAction: () => {},
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
