import { AuthService } from './../../../auth/auth.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
    MatDialog,
    MatDialogRef,
    MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IUserData } from 'src/app/models/user';
import { AccountService } from '../services/account.service';

@Component({
    selector: 'app-add-account',
    templateUrl: './add-account.component.html',
    styleUrls: ['./add-account.component.scss']
})
export class AddAccountComponent implements OnInit {
    formGroup: FormGroup;

    isLoggedInUserIsOwner: boolean = false;
    isShowLoader: boolean = false;
    isUserNameExist: boolean = true;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: IUserData,
        public dialog: MatDialog,
        public dialogRef: MatDialogRef<AddAccountComponent>,
        private formBuilder: FormBuilder,
        public snackBar: MatSnackBar,
        private accountService: AccountService
    ) { }

    ngOnInit() {
        this.initializeForm();
        if (this.data && this.data.id) {
            this.fillForm();
        }
    }



    initializeForm(): void {
        this.formGroup = this.formBuilder.group({
            userName: ['', Validators.required],
            bankName: ['', Validators.required],
            accountHolderFullName: ['', Validators.required],
            branchName: ['', Validators.required],
            accountNumber: ['', Validators.required],
            ifscCode: ['', Validators.required]
        });
    }

    saveAccount(): void {
        const {
            userName,
            bankName,
            accountHolderFullName,
            branchName,
            accountNumber,
            ifscCode,
         } =
            this.formGroup.value;
        this.isShowLoader = true;
        this.accountService
            .addUser({
                userName,
                bankName,
                accountHolderFullName,
                branchName,
                accountNumber,
                ifscCode
            })
            .subscribe(
                (response) => {
                    this.snackBar.open('Account saved successfully', 'OK', {
                        duration: 3000
                    });
                    this.isShowLoader = false;
                    this.dialogRef.close(true);
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

    updateAccount(): void {
        const { userName, bankName, accountHolderFullName,
            branchName,
            accountNumber,
            ifscCode } =
            this.formGroup.value;
        this.isShowLoader = true;
        this.accountService
            .editUser({
                id: this.data.id,
                userName,
                bankName,
                accountHolderFullName,
                branchName,
                accountNumber,
                ifscCode

            })
            .subscribe(
                (response) => {
                    this.snackBar.open('Account updated successfully', 'OK', {
                        duration: 3000
                    });
                    this.isShowLoader = false;
                    this.dialogRef.close(true);
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

    onSubmit() {
        if (this.data && this.data.id) {
            this.updateAccount();
        } else {
            this.saveAccount();
        }
    }

    fillForm() {
        // const {

        //     userName: userName,
        //     bankName: bankName,
        //     accountHolderFullName:accountHolderFullName,
        //     branchName: branchName,
        //     accountNumber: accountNumber,
        //     ifscCode: ifscCode

        // } = this.data;
        // this.formGroup.patchValue({
        //          userName,
        //         bankName,
        //         accountHolderFullName,
        //         branchName,
        //         accountNumber,
        //         ifscCode
        // });

    }

}
