import { AuthService } from '../../../auth/auth.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
    MatDialog,
    MatDialogRef,
    MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IncomeService } from '../services/investment.service';

@Component({
    selector: 'app-delete-investment',
    templateUrl: './delete-investment.component.html',
    styleUrls: ['./delete-investment.component.scss']
})
export class DeleteInvestmentComponent implements OnInit {
    formGroup: FormGroup;
    isLoggedInUserIsOwner: boolean = false;
    isShowLoader: boolean = false;
    isUserNameExist: boolean = true;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialog: MatDialog,
        public dialogRef: MatDialogRef<DeleteInvestmentComponent>,
        public snackBar: MatSnackBar,
        private incomeService: IncomeService,
        private authService: AuthService
    ) { }

    ngOnInit(): void {
    }

    removeUser(): void {
        let a = this.data;
        let id: number = +a;

        this.incomeService.removeInvestment(id).subscribe(
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
