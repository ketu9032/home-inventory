import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { IBorrowData } from 'src/app/models/borrow';
import { IExpenseData } from 'src/app/models/expense';
import { AccountService } from '../../account/services/account.service';
import { UserService } from '../../user/services/user.service';
import { BorrowNameService } from '../services/borrow-name.service';
import { ExpenseService } from '../services/borrow.service';
@Component({
    selector: 'app-add-borrow',
    templateUrl: './add-borrow.component.html',
    styleUrls: ['./add-borrow.component.scss']
})
export class AddBorrowComponent implements OnInit {
    formGroup: FormGroup;
    selectedRole: string
    categories = []
    isShowLoader = false;
    loggedInUser: boolean = true;
    amount = true
    currentDate = new Date()
    users: any;
    userAccounts: any;
    borrowNames: any;
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: IBorrowData,
        public dialog: MatDialog,
        public dialogRef: MatDialogRef<AddBorrowComponent>,
        private formBuilder: FormBuilder,
        public snackBar: MatSnackBar,
        private expenseService: ExpenseService,
        private userService: UserService,
        private accountService: AccountService,
        private borrowNameService: BorrowNameService,
    ) { }
    ngOnInit() {
        console.log(this.data);
        this.initializeForm();
        this.getUserDropDown();
        this.getBorrowNameDropDown();
        if (this.data) {
            this.fillForm();
            this.getAccountDropDownUserIdWise()
        }
    }
    initializeForm(): void {
        this.formGroup = this.formBuilder.group({
            userId: ['', Validators.required],
            accountId: ['', Validators.required],
            borrowNameId: ['', Validators.required],
            paymentMethod: ['', Validators.required],
            returnDate: ['', Validators.required],
            refName: ['', Validators.required],
            remark: ['', Validators.required],
            amount: ['', Validators.required]
        });
    }
    saveBorrow(): void {
        this.isShowLoader = true;
        this.expenseService
            .addBorrow({
                userId: +this.formGroup.value.userId,
                accountId: +this.formGroup.value.accountId,
                borrowNameId: +this.formGroup.value.borrowNameId,
                paymentMethod: this.formGroup.value.paymentMethod,
                remark: this.formGroup.value.remark,
                amount: this.formGroup.value.amount,
                returnDate: moment(this.formGroup.value.returnDate).format("YYYY-MM-DD"),
                refName: this.formGroup.value.refName
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
    updateBorrow(): void {
        const { userId,
            accountId,
            paymentMethod,
            returnDate,
            borrowNameId,
            refName,
            remark,
            amount } = this.formGroup.value;
        this.isShowLoader = true;
        this.expenseService
            .editBorrow({
                id: this.data.id,
                userId,
                accountId,
                borrowNameId,
                paymentMethod,
                remark,
                amount,
                returnDate,
                refName
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
        if (this.data && this.data.id) {
            this.updateBorrow();
        } else {
            this.saveBorrow();
        }
    }
    fillForm() {
        this.formGroup.patchValue({
            userId: this.data.user_id,
            accountId: this.data.account_id,
            borrowNameId: this.data.borrow_name_id,
            paymentMethod: this.data.payment_method,
            remark: this.data.remark,
            amount: this.data.amount,
            refName: this.data.ref_name,
            returnDate : this.data.return_date
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
        let id: number;
        if(this.data){
            id = +this.data.user_id;
        } else {
            id = +this.formGroup.value.userId;
        }
        this.accountService.getAccountUserWise
            (id).subscribe((response) => {
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
    getBorrowNameDropDown() {
        this.borrowNameService.borrowNameDropDown().subscribe((response) => {
            this.borrowNames = response
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
