import { CommonService } from '../../../shared/services/common.service';
import { Injectable } from '@angular/core';
import { IMatTableParams } from 'src/app/models/table';
import { RestService } from 'src/app/shared/services';
import { IBorrowParams } from 'src/app/models/borrow';
@Injectable({ providedIn: 'root' })
export class ExpenseService {
    private url = 'api/borrow';
    constructor(
        private restService: RestService,
        private commonService: CommonService) { }
    public getBorrow(tablePrams: IMatTableParams) {
         const queryString = this.commonService.toQueryString(tablePrams);
         return this.restService.get<any>(`${this.url}${queryString}`);
    }
    public addBorrow(borrow: IBorrowParams) {
        return this.restService.post(`${this.url}`, borrow);
    }
    public editBorrow(borrow: IBorrowParams) {
        return this.restService.put(`${this.url}`, borrow);
    }
    public removeBorrow(id: number) {
        return this.restService.put(`${this.url}/remove?id=${id}`);
    }
}
