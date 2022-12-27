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
import { IAccountData } from 'src/app/models/account';

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
        @Inject(MAT_DIALOG_DATA) public data: IAccountData,
        public dialog: MatDialog,
        public dialogRef: MatDialogRef<AddAccountComponent>,
        private formBuilder: FormBuilder,
        public snackBar: MatSnackBar,
        private accountService: AccountService
    ) { }

    ngOnInit() {
        this.data

        this.initializeForm();
        if (this.data && this.data.id) {
            this.fillForm();
        }
    }

    initializeForm(): void {
        this.formGroup = this.formBuilder.group({
            userName: ['', Validators.required],
            bankName: ['', Validators.required],
            accountHolderName: ['', Validators.required],
            branchName: ['', Validators.required],
            balance: ['', Validators.required],
            accountNumber: ['', Validators.required],
            ifscCode: ['', Validators.required]
        });
    }

    saveAccount(): void {
        const {
            userName,
            bankName,
            accountHolderName,
            branchName,
            accountNumber,
            ifscCode,
            balance
         } =
            this.formGroup.value;
        this.isShowLoader = true;
        this.accountService
            .addAccount({
                userName,
                bankName,
                accountHolderName,
                branchName,
                accountNumber,
                ifscCode,
                balance
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
        const { userName, bankName, accountHolderName,
            branchName,balance,
            accountNumber,
            ifscCode } =
            this.formGroup.value;
        this.isShowLoader = true;
        this.accountService
            .editAccount({
                id: this.data.id,
                userName,
                bankName,
                accountHolderName,
                branchName,
                accountNumber,
                ifscCode,
                balance

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

        this.formGroup.patchValue({
                 userName: this.data.user_id,
                bankName: this.data.bank_name,
                accountHolderName: this.data.account_holder_name,
                branchName:this.data.branch_name,
                accountNumber:this.data.account_number,
                ifscCode:this.data.ifsc_code,
                 balance:this.data.balance
        });

    }

}
