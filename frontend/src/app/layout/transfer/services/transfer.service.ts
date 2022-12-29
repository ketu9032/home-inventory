import { CommonService } from './../../../shared/services/common.service';
import { Injectable } from '@angular/core';
import { IMatTableParams, IMatTableParamsWithSearchParams } from 'src/app/models/table';
import { ITransferActiveParams, ITransferParams } from 'src/app/models/transfer';
import { RestService } from 'src/app/shared/services';

@Injectable({ providedIn: 'root'})
export class TransferService {
  private url = 'api/transfer';

  constructor(private restService: RestService, private commonService: CommonService) {}

  public getTransfer() {
    // const queryString = this.commonService.toQueryString(tablePrams);
    return this.restService.get(`${this.url}`);
  }
  public addTransfer(transfer: ITransferParams) {
    return this.restService.post(`${this.url}`, transfer);
  }
  public editTransfer(transfer: ITransferParams) {
    return this.restService.put(`${this.url}`, transfer);
  }
  public removeTransfer(id: number) {
    return this.restService.put(`${this.url}/remove?id=${id}`);
  }

}

