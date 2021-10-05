import { BackendSrvRequest, getBackendSrv } from '@grafana/runtime';
import { API_ENDPOINT } from 'app/core/env';
export interface BaselineDTO {
  id?: string;
  startDate: string;
  endDate: string;
  invoiceDate: string;
  noOfDays?: string;
  kwh: string;
  minKw: string;
  maxKw: string;
  avgKw: string;
  avgKva: string;
  pf: string;
  minPf: string;
  maxPf: string;
  rate: string;
  energyRate: string;
  fuelRate: string;
  ippRate: string;
  kvaRate: string;
  ippVariableRate: string;
  ippVariableCharge: string;
  energyCharge: string;
  kvaCharge: string;
  currentCharges: string;
  salesTax: string;
}

export class BaselineDatasource {
  _request(url: string) {
    const options: BackendSrvRequest = {
      headers: {},
      method: 'GET',
      url: `${API_ENDPOINT}${url}`,
    };
    return getBackendSrv().fetch<any>(options).toPromise();
  }

  _post(url: string, paylod: BaselineDTO) {
    const options: BackendSrvRequest = {
      headers: {},
      method: 'POST',
      data: paylod,
      url: `${API_ENDPOINT}${url}`,
    };
    return getBackendSrv().fetch<any>(options).toPromise();
  }
}
