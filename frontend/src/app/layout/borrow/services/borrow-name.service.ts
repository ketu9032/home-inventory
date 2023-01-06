import { CommonService } from '../../../shared/services/common.service';
import { Injectable } from '@angular/core';
import { IMatTableParams } from 'src/app/models/table';
import { RestService } from 'src/app/shared/services';
import { IExpenseParams, IExpenseTypeParams } from 'src/app/models/expense';
import { IBorrowNameParams } from 'src/app/models/borrow';

@Injectable({ providedIn: 'root' })
export class BorrowNameService {
    private url = 'api/borrowName';

    constructor(
        private restService: RestService,
        private commonService: CommonService) { }

    public getExpenseType(tablePrams: IMatTableParams) {
         const queryString = this.commonService.toQueryString(tablePrams);
         return this.restService.get<any>(`${this.url}${queryString}`);

    }
    public addBorrowName(borrowName: IBorrowNameParams) {
        return this.restService.post(`${this.url}`, borrowName);
    }
    public editBorrowName(borrowName: IBorrowNameParams) {
        return this.restService.put(`${this.url}`, borrowName);
    }
    public removeBorrowName(id: number) {
        return this.restService.put(`${this.url}/remove?id=${id}`);
    }
    public borrowNameDropDown() {
        return this.restService.get(`${this.url}/expenseTypeDropDown`);
    }

}

