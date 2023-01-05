import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { PAGE_SIZE, PAGE_SIZE_OPTION } from 'src/app/shared/global/table-config';
import { DashboardDetailsService } from '../services/dashboard-details.service';
@Component({
    selector: 'app-dashboard-details',
    templateUrl: './dashboard-details.component.html',
    styleUrls: ['./dashboard-details.component.scss']
})
export class DashboardDetailsComponent implements OnInit {
    public defaultPageSize = PAGE_SIZE;
    public pageSizeOptions = PAGE_SIZE_OPTION;
    startDate = moment().add(-30, 'days').format("YYYY-MM-DD");
    endDate = moment().format("YYYY-MM-DD");
    toDate: Date;
    fromDate: Date;
    isShowLoader = false;
    allDetails: any;
    details = {
        balance: 0,
        investment: 0,
        income: 0,
        expense: 0
    }
    constructor(
        public snackBar: MatSnackBar,
        private dashboardDetailsService: DashboardDetailsService,
    ) { }
    ngOnInit() {
        this.getDashboardDetails();
    }
    getDashboardDetails() {
        //    this.startDate =  moment(this.fromDate).format("YYYY-MM-DD");
        //     this.endDate =   moment(this.toDate).format("YYYY-MM-DD")
        this.dashboardDetailsService.dashboardDetails().subscribe((response) => {
            this.allDetails = response;
            this.details.balance = this.allDetails.response.res1.balance
            this.details.income = this.allDetails.response.res2.income;
            this.details.expense = this.allDetails.response.res3.expense;
            this.details.investment = this.allDetails.response.res4.investment;
        },
            (error) => {
                this.isShowLoader = false;
                this.snackBar.open(
                    (error.error && error.error.message) || error.message,
                    'Ok',
                    {
                        duration: 3000
                    }
                );
            },
            () => { }
        );
    }
    clearSearch() { }
}
