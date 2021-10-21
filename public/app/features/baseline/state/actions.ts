import { BaselineEntryFields } from '../types';
import { BaselineDTO, ThunkResult } from '../../../types';
import { setUpdating, initLoadingBaselineEntries, baselineEntriesLoaded, setModalOpen } from './reducers';
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
    console.log(`[ update ]`, payload);
    dispatch(setUpdating({ updating: true }));
    await api.updateBaselineEntry(payload);
    dispatch(loadBaselineEntries());
    dispatch(setUpdating({ updating: false }));
  };
}

export function updateModalOpen(payload: boolean): ThunkResult<void> {
  return async function (dispatch) {
    dispatch(setModalOpen({ open: payload }));
  };
}
