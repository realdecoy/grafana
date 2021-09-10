import { BaselineEntryFields } from './types';
import { BaselineDTO, BaselineDatasource } from '../../types';

const baselineQuery = new BaselineDatasource();

async function loadBaselineEntries(): Promise<BaselineDTO[]> {
  const { data: baselineRecords } = await baselineQuery._request('/api/baseline/');
  return baselineRecords;
}

async function submitBaselineEntry(payload: BaselineEntryFields): Promise<void> {
  await baselineQuery._post('/api/baseline/', payload);
}

export const api = {
  loadBaselineEntries,
  submitBaselineEntry,
};
