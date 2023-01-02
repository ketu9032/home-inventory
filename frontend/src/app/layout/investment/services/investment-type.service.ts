import { CommonService } from '../../../shared/services/common.service';
import { Injectable } from '@angular/core';
import { IMatTableParams } from 'src/app/models/table';
import { RestService } from 'src/app/shared/services';
import { IInvestmentTypeParams } from 'src/app/models/investment';

@Injectable({ providedIn: 'root' })
export class InvestmentTypeService {
    private url = 'api/investmentType';
    private url1 = 'api/investmentType/investmentTypeDropDown';

    constructor(private restService: RestService, private commonService: CommonService) { }

    public getInvestmentType(tablePrams: IMatTableParams) {
        const queryString = this.commonService.toQueryString(tablePrams);
        return this.restService.get(`${this.url}${queryString}`);
    }
    public addInvestmentType(investment: IInvestmentTypeParams) {
        return this.restService.post(`${this.url}`, investment);
    }
    public editInvestmentType(investment: IInvestmentTypeParams) {
        return this.restService.put(`${this.url}`, investment);
    }
    public removeInvestmentType(id: number) {
        return this.restService.put(`${this.url}/remove?id=${id}`);
    }
    public investmentTypeDropDown() {
        return this.restService.get(`${this.url}/investmentTypeDropDown`);
    }
}
