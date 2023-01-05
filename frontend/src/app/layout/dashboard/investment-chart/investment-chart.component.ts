import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as e from 'express';
import * as Highcharts from 'highcharts';
import * as moment from 'moment';
import { ISelectedDate } from 'src/app/models/table';
import { DashboardDetailsService } from '../services/dashboard-details.service';
@Component({
    selector: 'app-investment-chart',
    templateUrl: './investment-chart.component.html',
    styleUrls: ['./investment-chart.component.scss']
})
export class InvestmentChartComponent implements OnInit {
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

    public investmentChart: any = {
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
        colors: [
            '#4774da',
       ],
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
            name: 'Investment',
            data: []
        }]
    }
    constructor(
        public snackBar: MatSnackBar,
        private dashboardDetailsService: DashboardDetailsService,
    ) { }
    ngOnInit() {
        this.getInvestmentChart();
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
                    this.investmentChart.xAxis.categories = date
                    this.investmentChart.series[0].data = data
                    Highcharts.chart('investmentChartData', this.investmentChart);
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

    clearSearch() {

    }
}
