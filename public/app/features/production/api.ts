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

export const api = {
  loadProductionEntries,
  submitProductionEntry,
  updateProductionEntry,
  archiveProductionEntry,
};
