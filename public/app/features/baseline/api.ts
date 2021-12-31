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

async function archiveBaselineEntry(id: number): Promise<void> {
  await baselineQuery._get(`/api/archiveBaselineById/${id}`);
}


async function uploadDocument(fileDetails: FormData, file: File): Promise<void> {
  const { data: { signature } } = await baselineQuery._post(`/api/getUploadURL`,fileDetails);
  const bodyFormData = new FormData();
  bodyFormData.append('key', signature.key);
  bodyFormData.append('policy', signature.policy);
  bodyFormData.append('success_action_status', signature.success_action_status);
  bodyFormData.append('X-amz-credential', signature['X-amz-credential']);
  bodyFormData.append('X-amz-algorithm', signature['X-amz-algorithm']);
  bodyFormData.append('X-amz-date', signature['X-amz-date']);
  bodyFormData.append('X-amz-signature', signature['X-amz-signature']);
  bodyFormData.append('X-Amz-Security-Token', signature['X-Amz-Security-Token']);
  bodyFormData.append('file', file);
  
  console.log(signature);
}



export const api = {
  loadBaselineEntries,
  submitBaselineEntry,
  updateBaselineEntry,
  archiveBaselineEntry,
};
