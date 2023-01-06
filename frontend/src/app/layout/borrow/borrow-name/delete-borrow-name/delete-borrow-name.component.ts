import {
    MatDialog,
    MatDialogRef,
    MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExpenseTypeService } from '../../services/expense-type.service';

@Component({
    selector: 'app-delete-borrow-name',
    templateUrl: './delete-borrow-name.component.html',
    styleUrls: ['./delete-borrow-name.component.scss']
})
export class DeleteBorrowNameComponent implements OnInit {
    constructor(
        public dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private expenseTypeService: ExpenseTypeService,
        private dialogRef: MatDialogRef<DeleteBorrowNameComponent>,
        public snackBar: MatSnackBar
    ) { }

    ngOnInit() { }

    removeExpenseType(): void {
        this.expenseTypeService.removeExpenseType(this.data).subscribe(
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
