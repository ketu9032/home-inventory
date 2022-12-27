import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IExpenseData } from 'src/app/models/expense';
import { AccountService } from '../../account/services/account.service';
import { UserService } from '../../user/services/user.service';
import { ExpenseService } from '../services/expense.service';

@Component({
    selector: 'app-add-expense',
    templateUrl: './add-expense.component.html',
    styleUrls: ['./add-expense.component.scss']
})
export class AddExpenseComponent implements OnInit {
    formGroup: FormGroup;
    selectedRole: string

    categories = []
    isShowLoader = false;
    loggedInUser: boolean = true;
    amount = true
    currentDate = new Date()

    users: any
    userAccounts: any

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: IExpenseData,
        public dialog: MatDialog,
        public dialogRef: MatDialogRef<AddExpenseComponent>,
        private formBuilder: FormBuilder,
        public snackBar: MatSnackBar,
        private expenseService: ExpenseService,
        private userService: UserService,
        private accountService: AccountService
    ) { }

    ngOnInit() {
        console.log(this.data);
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
            toUserId: ['', Validators.required],
            paymentMethod: ['', Validators.required],
            remark: ['', Validators.required],
            amount: ['', Validators.required]
        });
    }

    saveExpense(): void {
        const {
            paymentMethod,
            remark } = this.formGroup.value;
        this.isShowLoader = true;
        this.expenseService
            .addExpense({
                userId: +this.formGroup.value.userId,
                accountId: +this.formGroup.value.accountId,
                toUserId: +this.formGroup.value.toUserId,
                paymentMethod,
                remark,
                amount: this.formGroup.value.amount
            })
            .subscribe(
                (response) => {
                    this.snackBar.open('Expense saved successfully', 'OK', {
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

    updateExpense(): void {
        const { userId,
            accountId,
            toUserId,
            paymentMethod,
            remark,
            amount } = this.formGroup.value;
        this.isShowLoader = true;
        this.expenseService
            .editExpense({
                id: this.data.expenseId,
                userId,
                accountId,
                toUserId,
                paymentMethod,
                remark,
                amount
            })
            .subscribe(
                (response) => {
                    this.isShowLoader = false;
                    this.snackBar.open('Expense updated successfully', 'OK', {
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
        if (this.data && this.data.expenseId) {
            this.updateExpense();
        } else {
            this.saveExpense();
        }
    }

    fillForm() {
        this.formGroup.patchValue({
            userId: this.data.user_id,
            accountId: this.data.account_id,
            toUserId: this.data.to_user_id,
            paymentMethod: this.data.payment_method,
            remark: this.data.remark,
            amount: this.data.amount,
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
