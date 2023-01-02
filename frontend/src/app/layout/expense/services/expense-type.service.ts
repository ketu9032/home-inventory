import { CommonService } from '../../../shared/services/common.service';
import { Injectable } from '@angular/core';
import { IMatTableParams } from 'src/app/models/table';
import { RestService } from 'src/app/shared/services';
import { IExpenseParams, IExpenseTypeParams } from 'src/app/models/expense';

@Injectable({ providedIn: 'root' })
export class ExpenseTypeService {
    private url = 'api/expenseType';

    constructor(
        private restService: RestService,
        private commonService: CommonService) { }

    public getExpenseType(tablePrams: IMatTableParams) {
         const queryString = this.commonService.toQueryString(tablePrams);
         return this.restService.get<any>(`${this.url}${queryString}`);

    }
    public addExpenseType(expense: IExpenseTypeParams) {
        return this.restService.post(`${this.url}`, expense);
    }
    public editExpenseType(expense: IExpenseTypeParams) {
        return this.restService.put(`${this.url}`, expense);
    }
    public removeExpenseType(id: number) {
        return this.restService.put(`${this.url}/remove?id=${id}`);
    }
    public expenseTypeDropDown() {
        return this.restService.get(`${this.url}/expenseTypeDropDown`);
    }

}

