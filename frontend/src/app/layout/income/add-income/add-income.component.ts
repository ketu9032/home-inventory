import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IExpenseData } from 'src/app/models/expense';
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

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: IExpenseData,
        public dialog: MatDialog,
        public dialogRef: MatDialogRef<AddIncomeComponent>,
        private formBuilder: FormBuilder,
        public snackBar: MatSnackBar,
        private incomeService: IncomeService
    ) { }

    ngOnInit() {
        this.initializeForm();
        if (this.data) {
            this.fillForm();
        }
    }

    initializeForm(): void {
        this.formGroup = this.formBuilder.group({
            userName: ['', Validators.required],
            accountNumber: ['', Validators.required],
            paymentMethod: ['', Validators.required],
            remark: ['', Validators.required],
            amount: ['', Validators.required]
        });
    }

    saveIncome(): void {
        const { userId,
            accountNumber,
            paymentMethod,
            remark,
            amount } = this.formGroup.value;
        this.isShowLoader = true;
        this.incomeService
            .addIncome({
                userId,
                accountNumber,
                paymentMethod,
                remark,
                amount
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
        const { userId,
            accountNumber,
            paymentMethod,
            remark,
            amount } = this.formGroup.value;
        this.isShowLoader = true;
        this.incomeService
            .editIncome({
                id: this.data.expenseId,
                userId,
                accountNumber,
                paymentMethod,
                remark,
                amount
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
        if (this.data && this.data.expenseId) {
            this.updateIncome();
        } else {
            this.saveIncome();
        }
    }

    fillForm() {
        // const {
        //       userId,
        //     accountNumber,
        //     paymentMethod,
        //     remark,
        //     amount } = this.data;
        // this.formGroup.patchValue({
        //     userId,
        //     accountNumber,
        //     paymentMethod,
        //     remark,
        //     amount
        // });
    }
}
