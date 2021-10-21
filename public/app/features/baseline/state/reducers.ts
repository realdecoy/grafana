import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BaselineDTO } from 'app/types';

export interface BaselineEntryState {
  baselineEntries: BaselineDTO[];
  baselineEntriesAreLoading: boolean;
  editBaselineEntryId: number;
  isUpdating: boolean;
  isModalOpen: boolean;
}

export const initialBaselineEntryState: BaselineEntryState = {
  baselineEntries: [],
  baselineEntriesAreLoading: false,
  editBaselineEntryId: 0,
  isUpdating: false,
  isModalOpen: false,
};

export const slice = createSlice({
  name: 'baseline',
  initialState: initialBaselineEntryState,
  reducers: {
    setUpdating: (state, action: PayloadAction<{ updating: boolean }>) => {
      console.log(`[isUpdating] ${action.payload.updating}`);
      state.isUpdating = action.payload.updating;
    },
    setModalOpen: (state, action: PayloadAction<{ open: boolean }>) => {
      state.isModalOpen = action.payload.open;
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
  },
});

export const {
  setUpdating,
  setEditBaselineModal,
  setModalOpen,
  initLoadingBaselineEntries,
  baselineEntriesLoaded,
} = slice.actions;

export const baselineReducer = slice.reducer;
export default { baseline: slice.reducer };
