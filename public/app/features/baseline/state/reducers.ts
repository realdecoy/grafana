import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BaselineDTO } from 'app/types';

export interface BaselineEntryState {
  baselineEntries: BaselineDTO[];
  baselineEntriesAreLoading: boolean;
  editBaselineEntryId: number;
  isUpdating: boolean;
  isModalOpen: boolean;
  isModalSaveOpen: boolean;
}

export const initialBaselineEntryState: BaselineEntryState = {
  baselineEntries: [],
  baselineEntriesAreLoading: false,
  editBaselineEntryId: 0,
  isUpdating: false,
  isModalOpen: false,
  isModalSaveOpen:false
};

export const slice = createSlice({
  name: 'baseline',
  initialState: initialBaselineEntryState,
  reducers: {
    setUpdating: (state, action: PayloadAction<{ updating: boolean }>) => {
      state.isUpdating = action.payload.updating;
    },
    setModalOpen: (state, action: PayloadAction<{ open: boolean }>) => {
      state.isModalOpen = action.payload.open;
    },
    setModalSaveOpen: (state, action: PayloadAction<{ open: boolean }>) => {
      console.log(action.payload.open)
      state.isModalSaveOpen = action.payload.open;
    },
    setEditBaselineModal: (state, action: PayloadAction<{ id: number }>) => {
      state.editBaselineEntryId = action.payload.id;
    },
    initLoadingBaselineEntries: (state, action: PayloadAction<undefined>) => {
      state.baselineEntriesAreLoading = true;
    },
    baselineEntriesLoaded: (state, action: PayloadAction<{ baselineEntries: BaselineDTO[] }>) => {
      state.baselineEntries = action.payload.baselineEntries;
      state.baselineEntriesAreLoading = false;
    },
    archiveBaselineEntry: (state, action: PayloadAction<{ id: number }>) => {
      state.editBaselineEntryId = action.payload.id;
    },
  },
});

export const {
  setUpdating,
  setEditBaselineModal,
  setModalOpen,
  archiveBaselineEntry,
  initLoadingBaselineEntries,
  baselineEntriesLoaded,
  setModalSaveOpen
} = slice.actions;

export const baselineReducer = slice.reducer;
export default { baseline: slice.reducer };
