import { createSlice } from '@reduxjs/toolkit';
import { DocumentType } from '../../types';

type StateType = {
  allDocument: DocumentType[];
  selectedDocument: DocumentType | null;
};

const initialState: StateType = {
  allDocument: [],
  selectedDocument: null,
};

const documentSlice = createSlice({
  name: 'document',
  initialState,
  reducers: {
    setDocuments: (state, action) => {
      state.allDocument = action.payload;
    },

    getDocumentsAction: () => {},
    createDocumentAction: () => {},
    deleteDocumentAction: () => {},
  },
});

export const {
  getDocumentsAction,
  createDocumentAction,
  setDocuments,
  deleteDocumentAction,
} = documentSlice.actions;

export default documentSlice.reducer;
