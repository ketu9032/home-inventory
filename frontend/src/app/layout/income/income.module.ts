
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {  IncomeComponent } from './income.component';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/modules/material/shared.module';
import { AddIncomeComponent } from './add-income/add-income.component';
import { IncomeRoutingModule } from './income-routing.module';
import { DeleteIncomeComponent } from './delete-income/delete-income.component';
import { IncomeTypeComponent } from './income-type/income-type.component';
import { AddIncomeTypeComponent } from './income-type/add-income-type/add-income-type.component';
import { DeleteIncomeTypeComponent } from './income-type/delete-income-type/delete-income-type.component';

@NgModule({
  declarations: [
    IncomeComponent,
    AddIncomeComponent,
    DeleteIncomeComponent,
    IncomeTypeComponent,
    AddIncomeTypeComponent,
    DeleteIncomeTypeComponent
  ],
  imports: [
    CommonModule,
    IncomeRoutingModule,
    SharedModule,
    MatCheckboxModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule.withConfig({ addFlexToParent: false })
  ],
  entryComponents: [
    AddIncomeComponent,
    DeleteIncomeComponent,
    IncomeTypeComponent,
    AddIncomeTypeComponent,
    DeleteIncomeTypeComponent
  ]
})
export class IncomeModule {}
