import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductionVolumeDTO } from 'app/types';

export interface ProductionEntryState {
  productionEntries: ProductionVolumeDTO[];
  productionEntriesAreLoading: boolean;
  editProductionEntryId: number;
  isUpdating: boolean;
  isModalOpen: boolean;
  isModalSaveOpen: boolean;
  isUploadModalOpen: boolean;
  archivedId: number;
}

export const initialProductionEntryState: ProductionEntryState = {
  productionEntries: [],
  productionEntriesAreLoading: false,
  editProductionEntryId: 0,
  isUpdating: false,
  isModalOpen: false,
  isModalSaveOpen: false,
  isUploadModalOpen: false,
  archivedId: 0,
};

export const slice = createSlice({
  name: 'Production',
  initialState: initialProductionEntryState,
  reducers: {
    setUpdating: (state, action: PayloadAction<{ updating: boolean }>) => {
      state.isUpdating = action.payload.updating;
    },
    setModalOpen: (state, action: PayloadAction<{ open: boolean }>) => {
      state.isModalOpen = action.payload.open;
    },
    setEditProductionModal: (state, action: PayloadAction<{ id: number }>) => {
      state.editProductionEntryId = action.payload.id;
    },
    setModalSaveOpen: (state, action: PayloadAction<{ open: boolean }>) => {
      console.log(action.payload.open);
      state.isModalSaveOpen = action.payload.open;
    },
    setModalUploadOpen: (state, action: PayloadAction<{ open: boolean }>) => {
      console.log(action.payload.open);
      state.isUploadModalOpen = action.payload.open;
    },
    setArchivedId: (state, action: PayloadAction<{ id: number }>) => {
      state.archivedId = action.payload.id;
    },
    initLoadingProductionEntries: (state, action: PayloadAction<undefined>) => {
      state.productionEntriesAreLoading = true;
    },
    ProductionEntriesLoaded: (state, action: PayloadAction<{ ProductionEntries: ProductionVolumeDTO[] }>) => {
      state.productionEntries = action.payload.ProductionEntries;
      state.productionEntriesAreLoading = false;
    },
    archiveProductionEntry: (state, action: PayloadAction<{ id: number }>) => {
      state.editProductionEntryId = action.payload.id;
    },
  },
});

export const {
  setUpdating,
  setEditProductionModal,
  setModalOpen,
  archiveProductionEntry,
  initLoadingProductionEntries,
  ProductionEntriesLoaded,
  setModalSaveOpen,
  setArchivedId,
  setModalUploadOpen,
} = slice.actions;

export const ProductionReducer = slice.reducer;
export default { Production: slice.reducer };
