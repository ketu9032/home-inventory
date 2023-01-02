import { CommonService } from '../../../shared/services/common.service';
import { Injectable } from '@angular/core';
import { IMatTableParams } from 'src/app/models/table';
import { RestService } from 'src/app/shared/services';
import { IIncomeParams } from 'src/app/models/income';

@Injectable({ providedIn: 'root' })
export class IncomeService {
    private url = 'api/investment';

    constructor(private restService: RestService, private commonService: CommonService) { }

    public getInvestment(tablePrams: IMatTableParams) {
        const queryString = this.commonService.toQueryString(tablePrams);
        return this.restService.get(`${this.url}${queryString}`);
    }
    public addInvestment(income: IIncomeParams) {
        return this.restService.post(`${this.url}`, income);
    }
    public editInvestment(income: IIncomeParams) {
        return this.restService.put(`${this.url}`, income);
    }
    public removeInvestment(id: number) {
        return this.restService.put(`${this.url}/remove?id=${id}`);
    }


}
