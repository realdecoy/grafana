import { format } from 'date-fns';
import { ProductionVolumeDTO, ProductionVolumeeDatasource } from '../../types';

const productionQuery = new ProductionVolumeeDatasource();

async function loadProductionEntries(): Promise<ProductionVolumeDTO[]> {
  const { data: ProductionRecords } = await productionQuery._get('/api/production/');
  return ProductionRecords;
}

async function submitProductionEntry(payload: ProductionVolumeDTO): Promise<void> {
  await productionQuery._post('/api/production', payload);
}

async function updateProductionEntry(payload: ProductionVolumeDTO): Promise<void> {
  await productionQuery._put('/api/production', payload);
}

async function archiveProductionEntry(id: number): Promise<void> {
  await productionQuery._get(`/api/archiveProductionById/${id}`);
}

async function uploadDocument(file: string | ArrayBuffer | null): Promise<void> {
  await productionQuery._post(`/api/getUploadURL`, {
    base64: file,
    fileName: `production_${format(new Date(), 'yyyy_MM_dd')}.csv`,
  });
}

export const api = {
  loadProductionEntries,
  submitProductionEntry,
  updateProductionEntry,
  archiveProductionEntry,
  uploadDocument,
};
