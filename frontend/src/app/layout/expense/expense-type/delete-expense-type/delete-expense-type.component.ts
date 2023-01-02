import {
    MatDialog,
    MatDialogRef,
    MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExpenseTypeService } from '../../services/expense-type.service';

@Component({
    selector: 'app-delete-expense-type',
    templateUrl: './delete-expense-type.component.html',
    styleUrls: ['./delete-expense-type.component.scss']
})
export class DeleteExpenseTypeComponent implements OnInit {
    constructor(
        public dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private expenseTypeService: ExpenseTypeService,
        private dialogRef: MatDialogRef<DeleteExpenseTypeComponent>,
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
