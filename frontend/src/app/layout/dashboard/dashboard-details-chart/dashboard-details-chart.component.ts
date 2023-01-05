import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as Highcharts from 'highcharts';
import * as moment from 'moment';
import { ISelectedDate } from 'src/app/models/table';
import { UserService } from '../../user/services/user.service';
import { DashboardDetailsService } from '../services/dashboard-details.service';
@Component({
    selector: 'app-dashboard-details-chart',
    templateUrl: './dashboard-details-chart.component.html',
    styleUrls: ['./dashboard-details-chart.component.scss']
})
export class DashboardDetailsChartComponent implements OnInit {
    users;
    fromDate
    toDate
    startDate: any;
    endDate: any;
    dayChart;
    formatChangeDate;
    daysArray = []

    //     selectedDate: ISelectedDate = {
    //         startDate: moment(moment(), "DD-MM-YYYY").add(-11, 'days'),
    //         endDate: moment(moment(), "DD-MM-YYYY").add(18, 'days'),
    // }

    public dashboardDetailsChart: any = {
        chart: {
            type: 'column'
        },
        accessibility: {
            description: '',
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: [],
            tickmarkPlacement: 'on',
            title: {
                enabled: false
            }
        },
        yAxis: {
            min: 0,

            title: {
                text: 'Amount (RS.)',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },

        colors: [
            '#5acf5a',
            '#ea6a6a',
            '#4774da'
       ],
        tooltip: {
            valueSuffix: ''
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'below',
            x: -40,
            y: 80,
            floating: true,
            borderWidth: 1,
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
            shadow: true
        },
        series: [{
            name: 'Income',
            data: []
        },
         {
            name: 'Expense',
            data: []

        },
         {
            name: 'Investment',
            data: []
        }
    ]
    }
    constructor(
        public snackBar: MatSnackBar,
        private dashboardDetailsService: DashboardDetailsService,
        private userService: UserService,
    ) { }
    ngOnInit() {
        this.getUserDropDown();
        this.getIncomeChart();
        this.getExpenseChart();
        this.getInvestmentChart();
    }

    getIncomeChart() {
        let data = []
        let date = []
        this.dashboardDetailsService
            .incomeChart()
            .subscribe(
                (response: []) => {
                    for (let index = 0; index < response.length; index++) {
                        let element: any = response[index]
                        data.push(+element.amount)
                        date.push(moment(element.date).format("DD-MM-YYYY")
                        )
                    }
                    this.dashboardDetailsChart.xAxis.categories = date
                    this.dashboardDetailsChart.series[0].data = data
                    Highcharts.chart('dashboardDetailsChart', this.dashboardDetailsChart);
                },
                (error) => {
                    this.snackBar.open(
                        (error.error && error.error.message) || error.message,
                        'Ok', {
                        duration: 3000
                    }
                    );
                },
                () => { }
            );
    }
    getExpenseChart() {
        let data = []
        let date = []
        this.dashboardDetailsService
            .expenseChart()
            .subscribe(
                (response: []) => {
                    for (let index = 0; index < response.length; index++) {
                        let element: any = response[index]
                        data.push(+element.amount)
                        date.push(moment(element.date).format("DD-MM-YYYY")
                        )
                    }
                    this.dashboardDetailsChart.xAxis.categories = date
                    this.dashboardDetailsChart.series[1].data = data
                    Highcharts.chart('dashboardDetailsChart', this.dashboardDetailsChart);
                },
                (error) => {
                    this.snackBar.open(
                        (error.error && error.error.message) || error.message,
                        'Ok', {
                        duration: 3000
                    }
                    );
                },
                () => { }
            );
    }
    getInvestmentChart() {
        let data = []
        let date = []
        this.dashboardDetailsService
            .investmentChart()
            .subscribe(
                (response: []) => {
                    for (let index = 0; index < response.length; index++) {
                        let element: any = response[index]
                        data.push(+element.amount)
                        date.push(moment(element.date).format("DD-MM-YYYY")
                        )
                    }
                    this.dashboardDetailsChart.xAxis.categories = date
                    this.dashboardDetailsChart.series[2].data = data
                    Highcharts.chart('dashboardDetailsChart', this.dashboardDetailsChart);
                },
                (error) => {
                    this.snackBar.open(
                        (error.error && error.error.message) || error.message,
                        'Ok', {
                        duration: 3000
                    }
                    );
                },
                () => { }
            );
    }

    getUserDropDown() {
        this.userService.userDropDown().subscribe((response) => {
            this.users = response
        },
            (error) => {

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


    getDaysArray(startDate, endDate) {
        for (var arr = [], dt = new Date(startDate); dt <= new Date(endDate); dt.setDate(dt.getDate() + 1)) {
            arr.push(new Date(dt));
        }
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];
            this.formatChangeDate = moment(element).format("DD-MM-YYYY");
            this.daysArray.push(this.formatChangeDate)
        }
    };
    clearSearch() {
        this.fromDate = '';
        this.toDate = '';
        this.getInvestmentChart()
        this.getUserDropDown();
    }
}
