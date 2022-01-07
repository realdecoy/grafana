import { BaselineEntryFields } from './types';
import { BaselineDTO, BaselineDatasource } from '../../types';
import { format } from 'date-fns';

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

async function archiveBaselineEntry(id: number): Promise<void> {
  await baselineQuery._get(`/api/archiveBaselineById/${id}`);
}

async function uploadDocument(file: string | ArrayBuffer | null): Promise<void> {

  await baselineQuery._post(`/api/getUploadURL`, {base64:file,fileName:`baseline_${format(new Date(), 'yyyy_MM_dd')}.csv`});
 
}
export const api = {
  loadBaselineEntries,
  submitBaselineEntry,
  updateBaselineEntry,
  archiveBaselineEntry,
  uploadDocument,
};
