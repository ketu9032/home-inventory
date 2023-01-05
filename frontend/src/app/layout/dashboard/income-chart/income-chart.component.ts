import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as e from 'express';
import * as Highcharts from 'highcharts';
import * as moment from 'moment';
import { ISelectedDate } from 'src/app/models/table';
import { UserService } from '../../user/services/user.service';
import { DashboardDetailsService } from '../services/dashboard-details.service';
@Component({
    selector: 'app-income-chart',
    templateUrl: './income-chart.component.html',
    styleUrls: ['./income-chart.component.scss']
})
export class IncomeChartComponent implements OnInit {
    users;
    fromDate;
    toDate;
    startDate: any;
    endDate: any;
    investmentChartData = [];
    formatChangeDate;
    daysArray = []

    //     selectedDate: ISelectedDate = {
    //         startDate: moment(moment(), "DD-MM-YYYY").add(-11, 'days'),
    //         endDate: moment(moment(), "DD-MM-YYYY").add(18, 'days'),
    // }

    public incomeChart: any = {
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
        colors: [
            '#5acf5a',
       ],
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
        }]
    }
    constructor(
        public snackBar: MatSnackBar,
        private dashboardDetailsService: DashboardDetailsService,
        private userService: UserService,
    ) { }
    ngOnInit() {
        this.getIncomeChart();
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
                    this.incomeChart.xAxis.categories = date
                    this.incomeChart.series[0].data = data
                    Highcharts.chart('incomeChart', this.incomeChart);
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
    clearSearch(){
        this.getIncomeChart();
    }
}
