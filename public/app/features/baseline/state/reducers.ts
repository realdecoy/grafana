import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BaselineDTO } from 'app/types';

export interface BaselineEntryState {
  baselineEntries: BaselineDTO[];
  baselineEntriesAreLoading: boolean;
  editBaselineEntryId: number;
  isUpdating: boolean;
  isUploadModalOpen: boolean;
  isModalOpen: boolean;
  isModalSaveOpen: boolean;
  archivedId: number;
  isAlertShowing: boolean;
}

export const initialBaselineEntryState: BaselineEntryState = {
  baselineEntries: [],
  baselineEntriesAreLoading: false,
  editBaselineEntryId: 0,
  isUpdating: false,
  isModalOpen: false,
  isUploadModalOpen: false,
  isModalSaveOpen: false,
  archivedId: 0,
  isAlertShowing: false,
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
    archiveAlertShowing: (state, action: PayloadAction<{ open: boolean }>) => {
      state.isAlertShowing = action.payload.open;
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
  setModalSaveOpen,
  setArchivedId,
  setModalUploadOpen,
  archiveAlertShowing,
} = slice.actions;

export const baselineReducer = slice.reducer;
export default { baseline: slice.reducer };
