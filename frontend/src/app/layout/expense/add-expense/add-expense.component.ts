import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IExpenseData } from 'src/app/models/expense';
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

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: IExpenseData,
        public dialog: MatDialog,
        public dialogRef: MatDialogRef<AddExpenseComponent>,
        private formBuilder: FormBuilder,
        public snackBar: MatSnackBar,
        private expenseService: ExpenseService
    ) { }

    ngOnInit() {
        this.initializeForm();
        if (this.data && this.data.expenseId) {
            this.fillForm();
        }
    }

    initializeForm(): void {
        this.formGroup = this.formBuilder.group({
            userName: ['', Validators.required],
            accountNumber: ['', Validators.required],
            toUserName: ['', Validators.required],
            paymentMethod: ['', Validators.required],
            remark: ['', Validators.required],
            amount: ['', Validators.required]
        });
    }

    saveExpense(): void {
        const { userId,
            accountNumber,
            toUserId,
            paymentMethod,
            remark,
            amount } = this.formGroup.value;
        this.isShowLoader = true;
        this.expenseService
            .addExpense({
                userId,
                accountNumber,
                toUserId,
                paymentMethod,
                remark,
                amount
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
            accountNumber,
            toUserId,
            paymentMethod,
            remark,
            amount } = this.formGroup.value;
        this.isShowLoader = true;
        this.expenseService
            .editExpense({
                id: this.data.expenseId,
                userId,
                accountNumber,
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
        // const {        userId,
        //     accountNumber,
        //     toUserId,
        //     paymentMethod,
        //     remark,
        //     amount } = this.data;
        // this.formGroup.patchValue({
        //     userId,
        //     accountNumber,
        //     toUserId,
        //     paymentMethod,
        //     remark,
        //     amount
        // });
    }
}
