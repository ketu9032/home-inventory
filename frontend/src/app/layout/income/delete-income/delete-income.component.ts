import { AuthService } from '../../../auth/auth.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
    MatDialog,
    MatDialogRef,
    MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IncomeService } from '../services/income.service';

@Component({
    selector: 'app-delete-income',
    templateUrl: './delete-income.component.html',
    styleUrls: ['./delete-income.component.scss']
})
export class DeleteIncomeComponent implements OnInit {
    formGroup: FormGroup;
    isLoggedInUserIsOwner: boolean = false;
    isShowLoader: boolean = false;
    isUserNameExist: boolean = true;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialog: MatDialog,
        public dialogRef: MatDialogRef<DeleteIncomeComponent>,
        public snackBar: MatSnackBar,
        private incomeService: IncomeService,
        private authService: AuthService
    ) { }

    ngOnInit(): void {
    }

    removeUser(): void {
        let a = this.data;
        let id: number = +a;

        this.incomeService.removeIncome(id).subscribe(
            (response) => {
                this.dialogRef.close({ data: true });
                this.snackBar.open('Income deleted successfully', 'OK', {
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
