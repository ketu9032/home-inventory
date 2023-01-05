import { CommonService } from '../../../shared/services/common.service';
import { Injectable } from '@angular/core';
import { RestService } from 'src/app/shared/services';

@Injectable({ providedIn: 'root' })
export class DashboardDetailsService {
    private url = 'api/dashboard';

    constructor(
        private restService: RestService,
        private commonService: CommonService) { }

    public dashboardDetails() {
         return this.restService.get(`${this.url}/details`);
    }
    public dashboardDetailsChart() {
         return this.restService.get(`${this.url}/detailsChart`);
    }
    public investmentChart() {
         return this.restService.get(`${this.url}/investmentChart`);
    }
    public incomeChart() {
         return this.restService.get(`${this.url}/incomeChart`);
    }
    public expenseChart() {
         return this.restService.get(`${this.url}/expenseChart`);
    }

}

