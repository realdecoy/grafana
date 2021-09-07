import { BackendSrvRequest, getBackendSrv } from '@grafana/runtime';

const api = 'https://48qlekz5g1.execute-api.us-east-1.amazonaws.com/kev';

export interface BaselineDTO {
  id?: string;
  startDate: string;
  endDate: string;
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
  ippVariableRate: string;
  ippVariableCharge: string;
  energyCharge: string;
  currentCharges: string;
}

export class BaselineDatasource {
  _request(url: string) {
    const options: BackendSrvRequest = {
      headers: {},
      method: 'GET',
      url: `${api}${url}`,
    };
    return getBackendSrv().fetch<any>(options).toPromise();
  }

  _post(url: string, paylod: BaselineDTO) {
    const options: BackendSrvRequest = {
      headers: {},
      method: 'POST',
      data: paylod,
      url: `${api}${url}`,
    };
    return getBackendSrv().fetch<any>(options).toPromise();
  }
}
