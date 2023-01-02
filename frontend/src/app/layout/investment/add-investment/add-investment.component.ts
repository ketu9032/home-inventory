import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IIncomeData } from 'src/app/models/income';
import { AccountService } from '../../account/services/account.service';
import { UserService } from '../../user/services/user.service';
import { InvestmentTypeService } from '../services/investment-type.service';
import { IncomeService } from '../services/investment.service';

@Component({
    selector: 'app-add-investment',
    templateUrl: './add-investment.component.html',
    styleUrls: ['./add-investment.component.scss']
})
export class AddInvestmentComponent implements OnInit {
    formGroup: FormGroup;
    selectedRole: string

    categories = []
    isShowLoader = false;
    loggedInUser: boolean = true;
    amount = true
    currentDate = new Date()

    users: any;
    userAccounts: any;
    investmentTypes: any;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: IIncomeData,
        public dialog: MatDialog,
        public dialogRef: MatDialogRef<AddInvestmentComponent>,
        private formBuilder: FormBuilder,
        public snackBar: MatSnackBar,
        private incomeService: IncomeService,
        private userService: UserService,
        private investmentTypeService: InvestmentTypeService,
        private accountService: AccountService,
    ) { }

    ngOnInit() {
        this.initializeForm();
        console.log(this.data)
        this.getUserDropDown();
        this.getInvestmentTypeDropDown();
        if (this.data) {
            this.fillForm();
        }
    }

    initializeForm(): void {
        this.formGroup = this.formBuilder.group({
            userId: ['', Validators.required],
            accountId: ['', Validators.required],
            amount: ['', Validators.required],
            paymentMethod: ['', Validators.required],
            investmentTypeId: ['', Validators.required],
            remark: ['', Validators.required],
        });
    }

    saveIncome(): void {
        this.isShowLoader = true;
        this.incomeService
            .addInvestment({
                userId: +this.formGroup.value.userId,
                accountId: +this.formGroup.value.accountId,
                investmentTypeId: +this.formGroup.value.investmentTypeId,
                paymentMethod: this.formGroup.value.paymentMethod,
                remark: this.formGroup.value.remark,
                amount: this.formGroup.value.amount,
            })
            .subscribe(
                (response) => {
                    this.snackBar.open('Investment saved successfully', 'OK', {
                        duration: 3000
                    });
                    this.isShowLoader = false;
                    this.dialogRef.close(true);
                },
                (error) => {
                    this.isShowLoader = false;
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

    updateIncome(): void {
        this.isShowLoader = true;
        this.incomeService
            .editInvestment({
                id: this.data.id,
                userId: +this.formGroup.value.userId,
                accountId: +this.formGroup.value.accountId,
                paymentMethod: this.formGroup.value.paymentMethod,
                remark: this.formGroup.value.remark,
                amount: this.formGroup.value.amount,
                investmentTypeId: this.formGroup.value.investmentTypeId,
            })
            .subscribe(
                (response) => {
                    this.isShowLoader = false;
                    this.snackBar.open('Investment updated successfully', 'OK', {
                        duration: 3000
                    });
                    this.dialogRef.close(true);
                },
                (error) => {
                    this.isShowLoader = false;
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

    onSubmit() {
        if (this.data && this.data.id) {
            this.updateIncome();
        } else {
            this.saveIncome();
        }
    }

    fillForm() {
        this.formGroup.patchValue({
            userId: this.data.user_id,
            accountId: this.data.account_id,
            paymentMethod: this.data.payment_method,
            remark: this.data.remark,
            amount: this.data.amount
        });
    }

    getUserDropDown() {
        this.userService.userDropDown().subscribe((response) => {
            this.users = response
        },
            (error) => {
                this.isShowLoader = false;
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

    getAccountDropDownUserIdWise() {
        let a = this.formGroup.value.userId;
        let id: number = +a
        this.accountService.getAccountUserWise
            (id).subscribe((response) => {
                this.userAccounts = response
            },
                (error) => {
                    this.isShowLoader = false;
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

    getInvestmentTypeDropDown() {
        this.investmentTypeService.investmentTypeDropDown
            ().subscribe((response) => {
                this.investmentTypes = response
            },
                (error) => {
                    this.isShowLoader = false;
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
}
