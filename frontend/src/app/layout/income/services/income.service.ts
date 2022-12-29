import { CommonService } from '../../../shared/services/common.service';
import { Injectable } from '@angular/core';
import { IMatTableParams } from 'src/app/models/table';
import { RestService } from 'src/app/shared/services';
import { IIncomeParams } from 'src/app/models/income';

@Injectable({ providedIn: 'root' })
export class IncomeService {
    private url = 'api/income';

    constructor(private restService: RestService, private commonService: CommonService) { }

    public getIncome(tablePrams: IMatTableParams) {
         const queryString = this.commonService.toQueryString(tablePrams);
        return this.restService.get(`${this.url}${queryString}`);
    }
    public addIncome(income: IIncomeParams) {
        return this.restService.post(`${this.url}`, income);
    }
    public editIncome(income: IIncomeParams) {
        return this.restService.put(`${this.url}`, income);
    }
    public removeIncome(id: number) {
        return this.restService.put(`${this.url}/remove?id=${id}`);
    }


}
