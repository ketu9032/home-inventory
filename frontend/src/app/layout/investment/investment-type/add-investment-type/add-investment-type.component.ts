import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IInvestmentTypeData } from 'src/app/models/investment';
import { InvestmentTypeService } from '../../services/investment-type.service';

@Component({
    selector: 'app-add-investment-type',
    templateUrl: './add-investment-type.component.html',
    styleUrls: ['./add-investment-type.component.scss']
})
export class AddInvestmentTypeComponent implements OnInit {
    formGroup: FormGroup;
    selectedRole: string
    tires = []
    isShowLoader = false;
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: IInvestmentTypeData,
        public dialog: MatDialog,
        public dialogRef: MatDialogRef<AddInvestmentTypeComponent>,
        private formBuilder: FormBuilder,
        public snackBar: MatSnackBar,
        private investmentTypeService: InvestmentTypeService,
    ) { }
    ngOnInit() {
        this.initializeForm();
        if (this.data && this.data.id) {
            this.fillForm();
        }
    }
    initializeForm(): void {
        this.formGroup = this.formBuilder.group({
            investmentType: ['', Validators.required],
        });
    }
    saveInvestmentType(): void {
        this.isShowLoader = true;

        this.investmentTypeService
            .addInvestmentType({
                investmentType: this.formGroup.value.investmentType
            })
            .subscribe(
                (response) => {
                    this.isShowLoader = false;
                    this.snackBar.open('Investment Type saved successfully', 'OK', {
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
        const { code } = this.formGroup.value;
        this.isShowLoader = true;
        this.investmentTypeService
            .editInvestmentType({
                id: this.data.id,
                investmentType: this.formGroup.value.investmentType
            })
            .subscribe(
                (response) => {
                    this.isShowLoader = false;
                    this.snackBar.open('Investment Type updated successfully', 'OK', {
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
        const { investmentType: investmentType } = this.data;
        this.formGroup.patchValue({
            investmentType,
        });
    }
}
