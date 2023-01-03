import {
    MatDialog,
    MatDialogRef,
    MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IncomeTypeService } from '../../services/income-type.service';

@Component({
    selector: 'app-delete-income-type',
    templateUrl: './delete-income-type.component.html',
    styleUrls: ['./delete-income-type.component.scss']
})
export class DeleteIncomeTypeComponent implements OnInit {
    constructor(
        public dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private incomeTypeService: IncomeTypeService,
        private dialogRef: MatDialogRef<DeleteIncomeTypeComponent>,
        public snackBar: MatSnackBar
    ) { }

    ngOnInit() { }

    removeExpenseType(): void {
        this.incomeTypeService.removeIncomeType(this.data).subscribe(
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
