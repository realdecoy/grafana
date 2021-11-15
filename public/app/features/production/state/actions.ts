import { ProductionVolumeDTO, ThunkResult } from '../../../types';
import {
  setUpdating,
  initLoadingProductionEntries,
  ProductionEntriesLoaded,
  setModalOpen,
  setEditProductionModal,
} from './reducers';
import { api } from '../api';

export function initProductionEntryPage(): ThunkResult<void> {
  return async function (dispatch) {
    dispatch(loadProductionEntries());
  };
}

function loadProductionEntries(): ThunkResult<void> {
  return async function (dispatch) {
    dispatch(initLoadingProductionEntries());
    const ProductionEntries = await api.loadProductionEntries();
    console.log(`[ production entries loaded ] ${ProductionEntries.length}`);
    dispatch(ProductionEntriesLoaded({ ProductionEntries }));
  };
}

export function submitProductionEntry(payload: ProductionVolumeDTO): ThunkResult<void> {
  return async function (dispatch) {
    console.log(`[ submit ]`, payload);
    dispatch(setUpdating({ updating: true }));
    await api.submitProductionEntry(payload);
    dispatch(loadProductionEntries());
    dispatch(setUpdating({ updating: false }));
  };
}

export function updateProductionEntry(payload: ProductionVolumeDTO): ThunkResult<void> {
  return async function (dispatch) {
    dispatch(setUpdating({ updating: true }));
    try {
      await api.updateProductionEntry(payload);
      dispatch(setModalOpen({ open: false }));
      dispatch(setEditProductionModal({ id: 0 }));
    } catch (err) {
      console.log(`[err]`);
    } finally {
      dispatch(loadProductionEntries());
      dispatch(setUpdating({ updating: false }));
    }
  };
}

export function openEditModal(payload: number): ThunkResult<void> {
  return async function (dispatch) {
    dispatch(setModalOpen({ open: true }));
    dispatch(setEditProductionModal({ id: payload }));
  };
}

export function archiveProduction(payload: number): ThunkResult<void> {
  return async function (dispatch) {
    dispatch(setUpdating({ updating: true }));
    try {
      await api.archiveProductionEntry(payload);
    } catch (err) {
      console.log(`[err]`);
    } finally {
      dispatch(loadProductionEntries());
      dispatch(setUpdating({ updating: false }));
    }
  };
}

export function closeEditModal(): ThunkResult<void> {
  return async function (dispatch) {
    dispatch(setModalOpen({ open: false }));
    dispatch(setEditProductionModal({ id: 0 }));
  };
}
