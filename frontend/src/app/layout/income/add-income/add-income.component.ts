import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IExpenseData } from 'src/app/models/expense';
import { IIncomeData } from 'src/app/models/income';
import { AccountService } from '../../account/services/account.service';
import { UserService } from '../../user/services/user.service';
import { IncomeService } from '../services/income.service';

@Component({
    selector: 'app-add-income',
    templateUrl: './add-income.component.html',
    styleUrls: ['./add-income.component.scss']
})
export class AddIncomeComponent implements OnInit {
    formGroup: FormGroup;
    selectedRole: string

    categories = []
    isShowLoader = false;
    loggedInUser: boolean = true;
    amount = true
    currentDate = new Date()

    users: any;
    userAccounts: any;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: IIncomeData,
        public dialog: MatDialog,
        public dialogRef: MatDialogRef<AddIncomeComponent>,
        private formBuilder: FormBuilder,
        public snackBar: MatSnackBar,
        private incomeService: IncomeService,
        private userService: UserService,
        private accountService: AccountService,
    ) { }

    ngOnInit() {
        console.log(this.data)
        this.initializeForm();
        this.getUserDropDown();
        if (this.data) {
            this.fillForm();
        }
    }

    initializeForm(): void {
        this.formGroup = this.formBuilder.group({
            userId: ['', Validators.required],
            accountId: ['', Validators.required],
            paymentMethod: ['', Validators.required],
            remark: ['', Validators.required],
            amount: ['', Validators.required]
        });
    }

    saveIncome(): void {

        this.isShowLoader = true;
        this.incomeService
            .addIncome({
                userId: +this.formGroup.value.userId,
                accountId: +this.formGroup.value.accountId,
                paymentMethod: this.formGroup.value.paymentMethod,
                remark: this.formGroup.value.remark,
                amount: this.formGroup.value.amount,
            })
            .subscribe(
                (response) => {
                    this.snackBar.open('Income saved successfully', 'OK', {
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
            .editIncome({
                id: this.data.id,
                userId: +this.formGroup.value.userId,
                accountId: +this.formGroup.value.accountId,
                paymentMethod: this.formGroup.value.paymentMethod,
                remark: this.formGroup.value.remark,
                amount: this.formGroup.value.amount,
            })
            .subscribe(
                (response) => {
                    this.isShowLoader = false;
                    this.snackBar.open('Income updated successfully', 'OK', {
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
        if (this.data) {
            this.updateIncome();
        } else {
            this.saveIncome();
        }
    }

    fillForm() {
        const {
              user_id: userId,
            account_id: accountId,
             payment_Method:paymentMethod,
            remark,
            amount } = this.data;
        this.formGroup.patchValue({
            userId,
            accountId,
            paymentMethod,
            remark,
            amount
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
            ({ id: id }).subscribe((response) => {
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
}
