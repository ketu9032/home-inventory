
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BorrowRoutingModule } from './borrow-routing.module';
import { BorrowComponent } from './borrow.component';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/modules/material/shared.module';
import { AddBorrowComponent } from './add-borrow/add-borrow.component';
import { DeleteBorrowComponent } from './delete-borrow/delete-borrow.component';
import { BorrowNameComponent } from './borrow-name/borrow-name.component';
import { DeleteBorrowNameComponent } from './borrow-name/delete-borrow-name/delete-borrow-name.component';
import { AddBorrowNameComponent } from './borrow-name/add-borrow-name/add-borrow-name.component';

@NgModule({
    declarations: [
        BorrowComponent,
        AddBorrowComponent,
        DeleteBorrowComponent,
        BorrowNameComponent,
        AddBorrowNameComponent,
        DeleteBorrowNameComponent
    ],
    imports: [
        CommonModule,
        BorrowRoutingModule,
        SharedModule,
        MatCheckboxModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        FlexLayoutModule.withConfig({ addFlexToParent: false })
    ],
    entryComponents: [
        BorrowComponent,
        AddBorrowComponent,
        DeleteBorrowComponent,
        BorrowNameComponent,
        AddBorrowNameComponent,
        DeleteBorrowNameComponent
    ]
})
export class BorrowModule { }
