import {
    MatDialog,
    MatDialogRef,
    MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BorrowNameService } from '../../services/borrow-name.service';

@Component({
    selector: 'app-delete-borrow-name',
    templateUrl: './delete-borrow-name.component.html',
    styleUrls: ['./delete-borrow-name.component.scss']
})
export class DeleteBorrowNameComponent implements OnInit {
    constructor(
        public dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private borrowNameService: BorrowNameService,
        private dialogRef: MatDialogRef<DeleteBorrowNameComponent>,
        public snackBar: MatSnackBar
    ) { }

    ngOnInit() { }

    removeExpenseType(): void {
        this.borrowNameService.removeBorrowName(this.data).subscribe(
            (response) => {
                this.dialogRef.close({ data: true });
                this.snackBar.open('Expense type deleted successfully', 'OK', {
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
