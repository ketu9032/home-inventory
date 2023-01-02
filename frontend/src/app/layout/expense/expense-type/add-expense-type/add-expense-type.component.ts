import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IExpenseTypeData } from 'src/app/models/expense';
import { IInvestmentTypeData } from 'src/app/models/investment';
import { ExpenseTypeService } from '../../services/expense-type.service';

@Component({
    selector: 'app-add-expense-type',
    templateUrl: './add-expense-type.component.html',
    styleUrls: ['./add-expense-type.component.scss']
})
export class AddExpenseTypeComponent implements OnInit {
    formGroup: FormGroup;
    selectedRole: string
    tires = []
    isShowLoader = false;
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: IExpenseTypeData,
        public dialog: MatDialog,
        public dialogRef: MatDialogRef<AddExpenseTypeComponent>,
        private formBuilder: FormBuilder,
        public snackBar: MatSnackBar,
        private expenseTypeService: ExpenseTypeService,
    ) { }
    ngOnInit() {
        this.data
        console.log(this.data);

        this.initializeForm();
        if (this.data && this.data.id) {
            this.fillForm();
        }
    }
    initializeForm(): void {
        this.formGroup = this.formBuilder.group({
            expenseType: ['', Validators.required],
        });
    }
    saveInvestmentType(): void {
        this.isShowLoader = true;
        this.expenseTypeService
            .addExpenseType({
                expenseType: this.formGroup.value.expenseType
            })
            .subscribe(
                (response) => {
                    this.isShowLoader = false;
                    this.snackBar.open('Expense type saved successfully', 'OK', {
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
    updateInvestmentType(): void {
        this.isShowLoader = true;
        this.expenseTypeService
            .editExpenseType({
                id: this.data.id,
                expenseType: this.formGroup.value.expenseType
            })
            .subscribe(
                (response) => {
                    this.isShowLoader = false;
                    this.snackBar.open('Investment type updated successfully', 'OK', {
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
            this.updateInvestmentType();
        } else {
            this.saveInvestmentType();
        }
    }
    fillForm() {

        this.formGroup.patchValue({
           expenseType: this.data.expense_type,
        });
    }
}
