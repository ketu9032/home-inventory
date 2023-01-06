import { AuthService } from '../../../auth/auth.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
    MatDialog,
    MatDialogRef,
    MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExpenseService } from '../services/borrow.service';

@Component({
    selector: 'app-delete-borrow',
    templateUrl: './delete-borrow.component.html',
    styleUrls: ['./delete-borrow.component.scss']
})
export class DeleteBorrowComponent implements OnInit {
    formGroup: FormGroup;
    isLoggedInUserIsOwner: boolean = false;
    isShowLoader: boolean = false;
    isUserNameExist: boolean = true;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialog: MatDialog,
        public dialogRef: MatDialogRef<DeleteBorrowComponent>,
        public snackBar: MatSnackBar,
        private expenseService: ExpenseService,
        private authService: AuthService
    ) { }

    ngOnInit(): void {}

    removeUser(): void {
        let a = this.data;
        let id: number = +a;

        this.expenseService.removeExpense(id).subscribe(
            (response) => {
                this.dialogRef.close({ data: true });
                this.snackBar.open('Expense deleted successfully', 'OK', {
                    duration: 3000
                });
            },
            (error) => {
                this.snackBar.open(error.error.message || error.message, 'Ok', {
                    duration: 3000
                });
            },
            () => { }
        );
    }

    onDismiss(): void {
        this.dialogRef.close({ data: false });
    }
}
