import { BaselineEntryFields } from '../types';
import { BaselineDTO, ThunkResult } from '../../../types';
import {
  setUpdating,
  initLoadingBaselineEntries,
  baselineEntriesLoaded,
  setModalOpen,
  setEditBaselineModal,
  setModalSaveOpen,
  setArchivedId,
  setModalUploadOpen,
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
    setModalSaveOpen({ open: true });
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
    }
  };
}

export function openEditModal(payload: number): ThunkResult<void> {
  return async function (dispatch) {
    dispatch(setModalOpen({ open: true }));
    dispatch(setEditBaselineModal({ id: payload }));
  };
}
export function openSaveModal(id: number): ThunkResult<void> {
  return async function (dispatch) {
    dispatch(setArchivedId({ id: id }));
    dispatch(setModalSaveOpen({ open: true }));
  };
}
export function openUploadModal(): ThunkResult<void> {
  return async function (dispatch) {
    dispatch(setModalUploadOpen({ open: true }));
  };
}

export function closeUploadModal(): ThunkResult<void> {
  return async function (dispatch) {
    dispatch(setModalUploadOpen({ open: false }));
  };
}

export function closeSaveModal(): ThunkResult<void> {
  return async function (dispatch) {
    dispatch(setModalSaveOpen({ open: false }));
  };
}
export function archiveBaseline(payload: number): ThunkResult<void> {
  return async function (dispatch) {
    dispatch(setUpdating({ updating: true }));
    try {
      await api.archiveBaselineEntry(payload);
    } catch (err) {
      console.log(`[err]`);
    } finally {
      dispatch(loadBaselineEntries());
      dispatch(setUpdating({ updating: false }));
      dispatch(setModalSaveOpen({ open: false }));
    }
  };
}
export function closeEditModal(): ThunkResult<void> {
  return async function (dispatch) {
    dispatch(setModalOpen({ open: false }));
    dispatch(setEditBaselineModal({ id: 0 }));
  };
}

export function openArchiveAlert(): ThunkResult<void> {
  return async function (dispatch) {
    dispatch(archiveAlertShowing({ open: true }));
  };
}

export function closeArchiveAlert(): ThunkResult<void> {
  return async function (dispatch) {
    dispatch(archiveAlertShowing({ open: false }));
  };
}

export function uploadDocument(file: string | ArrayBuffer | null): ThunkResult<void> {
  return async function (dispatch) {
    try {  
      await api.uploadDocument(file);
      
    } catch (err) {
      console.log(`[err]`);
    } finally {
      dispatch(setModalUploadOpen({ open: false }));
    }
  };
}
