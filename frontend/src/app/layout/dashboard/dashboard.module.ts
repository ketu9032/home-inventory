import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/modules/material/shared.module';
import { DashboardDetailsComponent } from './dashboard-details/dashboard-details.component';
import { DashboardDetailsChartComponent } from './dashboard-details-chart/dashboard-details-chart.component';
import { InvestmentChartComponent } from './investment-chart/investment-chart.component';
import { IncomeChartComponent } from './income-chart/income-chart.component';
import { ExpenseChartComponent } from './expense-chart/expense-chart.component';


@NgModule({
  declarations: [
    DashboardComponent,
    DashboardDetailsComponent,
    DashboardDetailsChartComponent,
    InvestmentChartComponent,
    IncomeChartComponent,
    ExpenseChartComponent
],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    MatCheckboxModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule.withConfig({ addFlexToParent: false })
  ],
  entryComponents: [
    DashboardComponent,
    DashboardDetailsComponent,
    DashboardDetailsChartComponent,
    InvestmentChartComponent,
    IncomeChartComponent,
    ExpenseChartComponent
  ],
})
export class DashboardModule { }
