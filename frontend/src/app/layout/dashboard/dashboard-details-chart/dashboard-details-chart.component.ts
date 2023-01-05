import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as Highcharts from 'highcharts';
import * as moment from 'moment';
import { ISelectedDate } from 'src/app/models/table';
import { DashboardDetailsService } from '../services/dashboard-details.service';
@Component({
    selector: 'app-dashboard-details-chart',
    templateUrl: './dashboard-details-chart.component.html',
    styleUrls: ['./dashboard-details-chart.component.scss']
})
export class DashboardDetailsChartComponent implements OnInit {

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
            name: 'Sale',
            data: []
        }, {
            name: 'Profit',
            data: []
        }]
    }
    constructor(
        public snackBar: MatSnackBar,
        private dashboardDetailsService: DashboardDetailsService,
    ) { }
    ngOnInit() {
        this.getDayWiseSalesProfitChart();
    }

    getDayWiseSalesProfitChart() {
        // if (this.selectedDate.startDate) {
        //     this.selectedDate.startDate = moment(this.startDate).format("YYYY-MM-DD")

        // }
        // if (this.selectedDate.endDate) {
        //     this.selectedDate.endDate = moment(this.endDate).format("YYYY-MM-DD")
        // }
        let convertedSalesDate;
        let convertedPurchaseDate;
        this.dashboardDetailsService
            .dashboardDetailsChart()

            .subscribe(
                (response) => {
                    this.dayChart = response

                    // for (let index = 0; index < this.dayChart.res1.length; index++) {
                    //     const element = this.dayChart.res1[index];
                    //     this.totalSaleInDayWise =       +this.totalSaleInDayWise + +element.sa

                    //     this.averageSaleInDayWise = (this.totalSaleInDayWise / 30)

                    // }

                    // for (let index = 0; index < this.dayChart.res2.length; index++) {
                    //     const element = this.dayChart.res2[index];
                    //     this.totalProfitInDayWise =        +this.totalProfitInDayWise + +element.pa
                    //     this.averageProfitInDayWise =  (this.totalProfitInDayWise / 30)

                    // }

                    for (let index = 0; index < this.daysArray.length; index++) {
                        const arraySignalDate = this.daysArray[index];
                        const salesDate = this.dayChart.res1.find(x => {
                            convertedSalesDate = moment(x.date).subtract(1).format("DD-MM-YYYY")
                            return convertedSalesDate === arraySignalDate;
                        })
                        if (arraySignalDate !== convertedSalesDate) {
                            this.dashboardDetailsChart.xAxis.categories.push(arraySignalDate)
                            this.dashboardDetailsChart.series[0].data.push(0);
                        } else (
                            this.dashboardDetailsChart.xAxis.categories.push(arraySignalDate),
                            this.dashboardDetailsChart.series[0].data.push(+salesDate.sa)
                        )
                        const purchaseDate = this.dayChart.res2.find(x => {
                            convertedPurchaseDate = moment(x.date).subtract(1).format("DD-MM-YYYY")
                            return convertedPurchaseDate === arraySignalDate;
                        })
                        if (arraySignalDate !== convertedPurchaseDate) {
                            this.dashboardDetailsChart.series[1].data.push(0);
                        } else (
                            this.dashboardDetailsChart.series[1].data.push(+purchaseDate.pa)
                        )

                    }
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
    clearSearch(){}
}
