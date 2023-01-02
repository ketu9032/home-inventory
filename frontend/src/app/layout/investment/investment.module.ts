
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
import { AddInvestmentTypeComponent } from './investment-type/add-investment-type/add-investment-type.component';
import { DeleteInvestmentTypeComponent } from './investment-type/delete-investment-type/delete-investment-type.component';
import { InvestmentTypeComponent } from './investment-type/investment-type.component';

@NgModule({
    declarations: [
        InvestmentComponent,
        AddInvestmentComponent,
        DeleteInvestmentComponent,
        InvestmentTypeComponent,
        AddInvestmentTypeComponent,
        DeleteInvestmentTypeComponent

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
        DeleteInvestmentComponent,
        DeleteInvestmentTypeComponent,
        InvestmentTypeComponent,
        AddInvestmentTypeComponent,
        DeleteInvestmentTypeComponent
    ]
})
export class InvestmentModule { }
