
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { InvestmentComponent } from './investment.component';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/modules/material/shared.module';
import { InvestmentRoutingModule } from './investment-routing.module';
import { DeleteInvestmentComponent } from './delete-investment/delete-investment.component';
import { AddInvestmentComponent } from './add-investment/add-investment.component';

@NgModule({
  declarations: [
    InvestmentComponent,
    AddInvestmentComponent,
    DeleteInvestmentComponent
  ],
  imports: [
    CommonModule,
    InvestmentRoutingModule,
    SharedModule,
    MatCheckboxModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule.withConfig({ addFlexToParent: false })
  ],
  entryComponents: [
    AddInvestmentComponent,
    DeleteInvestmentComponent
]
})
export class InvestmentModule {}
