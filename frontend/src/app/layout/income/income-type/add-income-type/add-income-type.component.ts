import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IIncomeTypeData } from 'src/app/models/income';
import { IncomeTypeService } from '../../services/income-type.service';

@Component({
    selector: 'app-add-income-type',
    templateUrl: './add-income-type.component.html',
    styleUrls: ['./add-income-type.component.scss']
})
export class AddIncomeTypeComponent implements OnInit {
    formGroup: FormGroup;
    selectedRole: string
    tires = []
    isShowLoader = false;
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: IIncomeTypeData,
        public dialog: MatDialog,
        public dialogRef: MatDialogRef<AddIncomeTypeComponent>,
        private formBuilder: FormBuilder,
        public snackBar: MatSnackBar,
        private incomeTypeService: IncomeTypeService,
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
            incomeType: ['', Validators.required],
        });
    }
    saveIncomeType(): void {
        this.isShowLoader = true;
        this.incomeTypeService
            .addIncomeType({
                incomeType: this.formGroup.value.incomeType
            })
            .subscribe(
                (response) => {
                    this.isShowLoader = false;
                    this.snackBar.open('Income type saved successfully', 'OK', {
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
    updateIncomeType(): void {
        this.isShowLoader = true;
        this.incomeTypeService
            .editIncomeType({
                id: this.data.id,
                incomeType: this.formGroup.value.incomeType
            })
            .subscribe(
                (response) => {
                    this.isShowLoader = false;
                    this.snackBar.open('Income type updated successfully', 'OK', {
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
            this.updateIncomeType();
        } else {
            this.saveIncomeType();
        }
    }
    fillForm() {

        this.formGroup.patchValue({
           expenseType: this.data.income_type,
        });
    }
}
