import { CommonService } from '../../../shared/services/common.service';
import { Injectable } from '@angular/core';
import { IMatTableParams, ISelectedDate } from 'src/app/models/table';
import { RestService } from 'src/app/shared/services';
import { IExpenseParams } from 'src/app/models/expense';

@Injectable({ providedIn: 'root' })
export class DashboardDetailsService {
    private url = 'api/dashboard';

    constructor(
        private restService: RestService,
        private commonService: CommonService) { }

    public dashboardDetails() {
         return this.restService.get(`${this.url}/details`);

    }
    public addExpense(expense: IExpenseParams) {
        return this.restService.post(`${this.url}`, expense);
    }
    public editExpense(expense: IExpenseParams) {
        return this.restService.put(`${this.url}`, expense);
    }
    public removeExpense(id: number) {
        return this.restService.put(`${this.url}/remove?id=${id}`);
    }


}

