import { NgModule } from '@angular/core';
import { AccountService } from './services/account.service';
import { AccountComponent } from './account.component';
import { AccountRoutingModule } from './account.routing.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/modules/material/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AddAccountComponent } from './add-account/add-account.component';

@NgModule({
    declarations: [AccountComponent, AddAccountComponent],
    imports: [
        CommonModule,
        SharedModule,
        MatCheckboxModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule.withConfig({ addFlexToParent: false }),
        AccountRoutingModule
    ],
    entryComponents: [AddAccountComponent],
    providers: [AccountService]
})
export class AccountModule { }
