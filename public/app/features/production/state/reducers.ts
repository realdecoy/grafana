import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductionVolumeDTO } from 'app/types';

export interface ProductionEntryState {
  productionEntries: ProductionVolumeDTO[];
  productionEntriesAreLoading: boolean;
  editProductionEntryId: number;
  isUpdating: boolean;
  isModalOpen: boolean;
}

export const initialProductionEntryState: ProductionEntryState = {
  productionEntries: [],
  productionEntriesAreLoading: false,
  editProductionEntryId: 0,
  isUpdating: false,
  isModalOpen: false,
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
} = slice.actions;

export const ProductionReducer = slice.reducer;
export default { Production: slice.reducer };
