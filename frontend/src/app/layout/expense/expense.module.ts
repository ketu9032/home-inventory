
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ExpenseRoutingModule } from './expense-routing.module';
import { ExpenseComponent } from './expense.component';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/modules/material/shared.module';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { DeleteExpenseComponent } from './delete-expense/delete-expense.component';
import { ExpenseTypeComponent } from './expense-type/expense-type.component';
import { AddExpenseTypeComponent } from './expense-type/add-expense-type/add-expense-type.component';
import { DeleteExpenseTypeComponent } from './expense-type/delete-expense-type/delete-expense-type.component';

@NgModule({
    declarations: [
        ExpenseComponent,
        AddExpenseComponent,
        DeleteExpenseComponent,
        ExpenseTypeComponent,
        AddExpenseTypeComponent,
        DeleteExpenseTypeComponent
    ],
    imports: [
        CommonModule,
        ExpenseRoutingModule,
        SharedModule,
        MatCheckboxModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        FlexLayoutModule.withConfig({ addFlexToParent: false })
    ],
    entryComponents: [
        AddExpenseComponent,
        DeleteExpenseComponent,
        ExpenseTypeComponent,
        AddExpenseTypeComponent,
        DeleteExpenseTypeComponent
    ]
})
export class ExpenseModule { }
