import { BackendSrvRequest, getBackendSrv } from '@grafana/runtime';
import { API_ENDPOINT } from 'app/core/env';

export type ProductionVolumeDTO = {
  id?: number;
  day: number;
  wareHouseStaff: number;
  storeEmployees: number;
  staffTotal: number;
  noOfStaffOfficeSales: number;
  noOfStaffOfficeAccounts: number;
  noOfStaffOfficeGroupPurchasing: number;
  noOfStaffOfficeStorePurchasing: number;
  noOfStaffStoreCustomerService: number;
  noOfStaffStoreCashiers: number;
  noOfStaffStorePharmacy: number;
  noOfStaffStoreSalesFloor: number;
  noOfStaffStoreReceival: number;
  noOfCustomersTotal: number;
  noOfCustomersStore: number;
  noOftransactionstotal: number;
  nooftransactionsitemdepartmenta: number;
  nooftransactionsitemdepartmentb: number;
  nooftransactionsitemdepartmentc: number;
  nooftransactionsitemdepartmentd: number;
  nooftransactionsitemdepartmente: number;
  truckDeliveriesTotal: number;
  truckDeliveriesTypea: number;
  truckDeliveriesTypeb: number;
  truckDeliveriesTypec: number;
  truckDeliveriesTyped: number;
};
export class ProductionVolumeeDatasource {
  _get(url: string) {
    const options: BackendSrvRequest = {
      headers: {},
      method: 'GET',
      url: `${API_ENDPOINT}${url}`,
    };
    return getBackendSrv().fetch<any>(options).toPromise();
  }

  _post(url: string, paylod: ProductionVolumeDTO) {
    const options: BackendSrvRequest = {
      headers: {},
      method: 'POST',
      data: paylod,
      url: `${API_ENDPOINT}${url}`,
    };
    return getBackendSrv().fetch<any>(options).toPromise();
  }

  _put(url: string, paylod: ProductionVolumeDTO) {
    const options: BackendSrvRequest = {
      headers: {},
      method: 'PUT',
      data: paylod,
      url: `${API_ENDPOINT}${url}`,
    };
    return getBackendSrv().fetch<any>(options).toPromise();
  }
}
