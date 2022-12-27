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
import { UserService } from '../../user/services/user.service';

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
    users: any;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: IAccountData,
        public dialog: MatDialog,
        public dialogRef: MatDialogRef<AddAccountComponent>,
        private formBuilder: FormBuilder,
        public snackBar: MatSnackBar,
        private accountService: AccountService,
        private userService: UserService,
    ) { }

    ngOnInit() {


        this.initializeForm();
        this.getUserDropDown()
        if (this.data && this.data.id) {
            this.fillForm();
        }
    }

    initializeForm(): void {
        this.formGroup = this.formBuilder.group({
            userId: ['', Validators.required],
            bankName: ['', Validators.required],
            accountHolderName: ['', Validators.required],
            branchName: ['', Validators.required],
            balance: ['', Validators.required],
            accountNumber: ['', Validators.required],
            ifscCode: ['', Validators.required],
            accountType: ['', Validators.required],
            swiftCode: ['']
        });
    }

    saveAccount(): void {
        let id = this.formGroup.value.userId;
        let userID: number = +id;
        const {
            bankName,
            accountHolderName,
            branchName,
            accountNumber,
            ifscCode,
            balance, accountType, swiftCode
        } =
            this.formGroup.value;
        this.isShowLoader = true;
        this.accountService
            .addAccount({
                userId: userID,
                bankName,
                accountHolderName,
                branchName,
                accountNumber,
                ifscCode,
                balance,
                accountType,
                swiftCode
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
        const { userId, bankName, accountHolderName,
            branchName, balance,
            accountNumber, accountType, swiftCode,
            ifscCode } =
            this.formGroup.value;
        this.isShowLoader = true;
        this.accountService
            .editAccount({
                id: this.data.id,
                userId,
                bankName,
                accountHolderName,
                branchName,
                accountNumber,
                ifscCode,
                balance, accountType, swiftCode

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
            userId: this.data.user_id,
            bankName: this.data.bank_name,
            accountHolderName: this.data.account_holder_name,
            branchName: this.data.branch_name,
            accountNumber: this.data.account_number,
            ifscCode: this.data.ifsc_code,
            balance: this.data.balance,
            accountType: this.data.account_type, swiftCode: this.data.swift_code
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
}
