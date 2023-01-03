import { CommonService } from '../../../shared/services/common.service';
import { Injectable } from '@angular/core';
import { IMatTableParams } from 'src/app/models/table';
import { RestService } from 'src/app/shared/services';
import { IExpenseParams, IExpenseTypeParams } from 'src/app/models/expense';
import { IIncomeTypeParams } from 'src/app/models/income';

@Injectable({ providedIn: 'root' })
export class IncomeTypeService {
    private url = 'api/incomeType';

    constructor(
        private restService: RestService,
        private commonService: CommonService) { }

    public getIncomeType(tablePrams: IMatTableParams) {
         const queryString = this.commonService.toQueryString(tablePrams);
         return this.restService.get<any>(`${this.url}${queryString}`);

    }
    public addIncomeType(income: IIncomeTypeParams) {
        return this.restService.post(`${this.url}`, income);
    }
    public editIncomeType(income: IIncomeTypeParams) {
        return this.restService.put(`${this.url}`, income);
    }
    public removeIncomeType(id: number) {
        return this.restService.put(`${this.url}/remove?id=${id}`);
    }
    public incomeTypeDropDown() {
        return this.restService.get(`${this.url}/incomeTypeDropDown`);
    }

}

