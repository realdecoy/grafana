import { BackendSrvRequest, getBackendSrv } from '@grafana/runtime';
import { API_ENDPOINT } from 'app/core/env';

export type ProductionVolumeDTO = {
  id?: string;
  day: string;
  wareHouseStaff: string;
  storeEmployees: string;
  staffTotal: string;
  noOfStaffOfficeSales: string;
  noOfStaffOfficeAccounts: string;
  noOfStaffOfficeGroupPurchasing: string;
  noOfStaffOfficeStorePurchasing: string;
  noOfStaffStoreCustomerService: string;
  noOfStaffStoreCashiers: string;
  noOfStaffStorePharmacy: string;
  noOfStaffStoreSalesFloor: string;
  noOfStaffStoreReceival: string;
  noOfCustomersTotal: string;
  noOfCustomersStore: string;
  noOftransactionstotal: string;
  nooftransactionsitemdepartmenta: string;
  nooftransactionsitemdepartmentb: string;
  nooftransactionsitemdepartmentc: string;
  nooftransactionsitemdepartmentd: string;
  nooftransactionsitemdepartmente: string;
  truckDeliveriesTotal: string;
  truckDeliveriesTypea: string;
  truckDeliveriesTypeb: string;
  truckDeliveriesTypec: string;
  truckDeliveriesTyped: string;
  wareHouseHiProStore: string;
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
