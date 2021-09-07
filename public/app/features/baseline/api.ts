// import { getBackendSrv } from '@grafana/runtime';

import { BaselineEntryFields } from './types';
import { BaselineDTO, BaselineDatasource } from '../../types';
let baselineRecords: BaselineDTO[] = [];

const baselineQuery = new BaselineDatasource();

function loadBaselineEntries(): Promise<BaselineDTO[]> {
  // TODO: replace fabircated promise with commented line below
  // return getBackendSrv().get('/api/baseline');
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(baselineRecords);
    }, 3000);
  });
}

async function submitBaselineEntry(payload: BaselineEntryFields): Promise<void> {
  // TODO: replace fabircated promise with commented line below
  await baselineQuery._post('/api/baseline/', payload);
  const baselineRecord = {
    ...payload,
    id: (baselineRecords.length + 1).toString(),
  } as BaselineDTO;

  baselineRecords = [...baselineRecords, baselineRecord];
  await new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 3000);
  });
}

export const api = {
  loadBaselineEntries,
  submitBaselineEntry,
};
