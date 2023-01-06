import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IBorrowNameData } from 'src/app/models/borrow';
import { IExpenseTypeData } from 'src/app/models/expense';
import { BorrowNameService } from '../../services/borrow-name.service';

@Component({
    selector: 'app-add-borrow-name',
    templateUrl: './add-borrow-name.component.html',
    styleUrls: ['./add-borrow-name.component.scss']
})
export class AddBorrowNameComponent implements OnInit {
    formGroup: FormGroup;
    selectedRole: string
    tires = []
    isShowLoader = false;
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: IBorrowNameData,
        public dialog: MatDialog,
        public dialogRef: MatDialogRef<AddBorrowNameComponent>,
        private formBuilder: FormBuilder,
        public snackBar: MatSnackBar,
        private borrowNameService: BorrowNameService,
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
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            mobileNumber: ['', Validators.required],
            alternativeNumber: ['', Validators.required],
        });
    }
    saveBorrowName(): void {
        this.isShowLoader = true;
        this.borrowNameService
            .addBorrowName(
                 this.formGroup.value
            )
            .subscribe(
                (response) => {
                    this.isShowLoader = false;
                    this.snackBar.open('Borrow name saved successfully', 'OK', {
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
    updateBorrowName(): void {
        this.isShowLoader = true;
        this.borrowNameService
            .editBorrowName({
                id: this.data.id,
                firstName: this.formGroup.value.firstName,
                lastName: this.formGroup.value.lastName,
                mobileNumber: this.formGroup.value.mobileNumber,
                alternativeNumber: this.formGroup.value.alternativeNumber,
            })
            .subscribe(
                (response) => {
                    this.isShowLoader = false;
                    this.snackBar.open('Borrow type updated successfully', 'OK', {
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
            this.updateBorrowName();
        } else {
            this.saveBorrowName();
        }
    }
    fillForm() {

        this.formGroup.patchValue({
            firstName: this.data.first_name,
            lastName: this.data.last_name,
            mobileNumber: this.data.mobile_number,
            alternativeNumber: this.data.alternative_number,
        });
    }
}
