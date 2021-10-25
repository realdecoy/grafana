import { BaselineEntryFields } from './types';
import { BaselineDTO, BaselineDatasource } from '../../types';

const baselineQuery = new BaselineDatasource();

async function loadBaselineEntries(): Promise<BaselineDTO[]> {
  const { data: baselineRecords } = await baselineQuery._get('/api/baseline/');
  return baselineRecords;
}

async function submitBaselineEntry(payload: BaselineEntryFields): Promise<void> {
  await baselineQuery._post('/api/baseline/', payload);
}

async function updateBaselineEntry(payload: BaselineDTO): Promise<void> {
  await baselineQuery._put('/api/baseline/', payload);
}

export const api = {
  loadBaselineEntries,
  submitBaselineEntry,
  updateBaselineEntry,
};
