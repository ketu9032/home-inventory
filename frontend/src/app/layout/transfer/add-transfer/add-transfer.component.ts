import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { ITransferData } from 'src/app/models/transfer';
import { IUserData } from 'src/app/models/user';
import { AccountService } from '../../account/services/account.service';
import { UserService } from '../../user/services/user.service';
import { TransferService } from '../services/transfer.service';
@Component({
    selector: 'app-add-transfer',
    templateUrl: './add-transfer.component.html',
    styleUrls: ['./add-transfer.component.scss']
})
export class AddTransferComponent implements OnInit {
    formGroup: FormGroup;
    selectedRole: string
    users: any;
    userAccounts: any;
    isShowLoader = false;
    currentDate = new Date();

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: ITransferData,
        public dialog: MatDialog,
        public dialogRef: MatDialogRef<AddTransferComponent>,
        private formBuilder: FormBuilder,
        public snackBar: MatSnackBar,
        private router: Router,
        private transferService: TransferService,
        private userService: UserService,
        private accountService: AccountService,
        public authService: AuthService,
    ) { }
    ngOnInit() {
        console.log(this.data)
        this.initializeForm();
        this.getUserDropDown();
        if (this.data ) {
            this.fillForm();
        }
    }
    initializeForm(): void {
        this.formGroup = this.formBuilder.group({
            userId: ['', Validators.required],
            accountId: ['', Validators.required],
            toUserId: ['', Validators.required],
            toUserAccountId: ['', Validators.required],
            remark: ['', Validators.required],
            amount: ['', Validators.required],
            paymentMethod: ['', Validators.required]
        });
    }
    saveTransfer(): void {
        this.isShowLoader = true;
        this.transferService
            .addTransfer({
                userId: +this.formGroup.value.userId,
                accountId:+this.formGroup.value.accountId,
                toUserId:+this.formGroup.value.toUserId,
                toUserAccountId:+this.formGroup.value.toUserAccountId,
                remark:this.formGroup.value.remark,
                amount:this.formGroup.value.amount,
                paymentMethod:this.formGroup.value.paymentMethod
            })
            .subscribe(
                (response) => {
                    this.snackBar.open('Transfer saved successfully', 'OK', {
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
    updateTransfer(): void {
       this.isShowLoader = true;
        this.transferService
            .editTransfer({
                 id: this.data.id,
                userId: +this.formGroup.value.userId,
                accountId:+this.formGroup.value.accountId,
                toUserId:+this.formGroup.value.toUserId,
                toUserAccountId:+this.formGroup.value.toUserAccountId,
                remark:this.formGroup.value.remark,
                amount:this.formGroup.value.amount,
                paymentMethod:this.formGroup.value.paymentMethod
            })
            .subscribe(
                (response) => {
                    this.snackBar.open('transfer updated successfully', 'OK', {
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
    onSubmit() {
        if (this.data ) {
            this.updateTransfer();
        } else {
            this.saveTransfer();
        }
    }
    fillForm() {
        this.formGroup.patchValue({
            userId: this.data.user_id,
            // accountId: this.data.,
            toUserId: this.data.to_user_id,
            // toUserAccountId: this.data.,
            remark: this.data.remark,
            amount: this.data.amount,
            paymentMethod: this.data.payment_method,
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
