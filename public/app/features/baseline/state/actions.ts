import { BaselineEntryFields } from '../types';
import { BaselineDTO, ThunkResult } from '../../../types';
import {
  setUpdating,
  initLoadingBaselineEntries,
  baselineEntriesLoaded,
  setModalOpen,
  setEditBaselineModal,
} from './reducers';
import { api } from '../api';

export function initBaselineEntryPage(): ThunkResult<void> {
  return async function (dispatch) {
    dispatch(loadBaselineEntries());
  };
}

function loadBaselineEntries(): ThunkResult<void> {
  return async function (dispatch) {
    dispatch(initLoadingBaselineEntries());
    const baselineEntries = await api.loadBaselineEntries();
    console.log(`[ baseine entries loaded ] ${baselineEntries.length}`);
    dispatch(baselineEntriesLoaded({ baselineEntries }));
  };
}

export function submitBaselineEntry(payload: BaselineEntryFields): ThunkResult<void> {
  return async function (dispatch) {
    console.log(`[ submit ]`, payload);
    dispatch(setUpdating({ updating: true }));
    await api.submitBaselineEntry(payload);
    dispatch(loadBaselineEntries());
    dispatch(setUpdating({ updating: false }));
  };
}

export function updateBaselineEntry(payload: BaselineDTO): ThunkResult<void> {
  return async function (dispatch) {
    dispatch(setUpdating({ updating: true }));
    try {
      await api.updateBaselineEntry(payload);
      dispatch(setModalOpen({ open: false }));
      dispatch(setEditBaselineModal({ id: 0 }));
    } catch (err) {
      console.log(`[err]`);
    } finally {
      dispatch(loadBaselineEntries());
      dispatch(setUpdating({ updating: false }));
      dispatch(setUpdating({ updating: false }));
    }
  };
}

export function openEditModal(payload: number): ThunkResult<void> {
  return async function (dispatch) {
    dispatch(setModalOpen({ open: true }));
    dispatch(setEditBaselineModal({ id: payload }));
  };
}

export function archiveBaseline(payload: number): ThunkResult<void> {
  return async function (dispatch) {
    console.log(`[ archive baseline ]`);
    dispatch(setUpdating({ updating: true }));
    try {
      await api.archiveBaselineEntry(payload);
      console.log(`[ archive baseline ]`);
      dispatch(setModalOpen({ open: false }));
      dispatch(setEditBaselineModal({ id: payload }));
    } catch (err) {
      console.log(`[err]`);
    } finally {
      dispatch(loadBaselineEntries());
      dispatch(setUpdating({ updating: false }));
      dispatch(setUpdating({ updating: false }));
    }
  };
}

export function closeEditModal(): ThunkResult<void> {
  return async function (dispatch) {
    dispatch(setModalOpen({ open: false }));
    dispatch(setEditBaselineModal({ id: 0 }));
  };
}
