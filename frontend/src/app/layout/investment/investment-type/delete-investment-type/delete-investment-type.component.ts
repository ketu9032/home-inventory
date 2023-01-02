import {
    MatDialog,
    MatDialogRef,
    MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InvestmentTypeService } from '../../services/investment-type.service';

@Component({
    selector: 'app-delete-investment-type',
    templateUrl: './delete-investment-type.component.html',
    styleUrls: ['./delete-investment-type.component.scss']
})
export class DeleteInvestmentTypeComponent implements OnInit {
    constructor(
        public dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public data: string,
        private investmentTypeService: InvestmentTypeService,
        private dialogRef: MatDialogRef<DeleteInvestmentTypeComponent>,
        public snackBar: MatSnackBar
    ) { }

    ngOnInit() { }

    removeInvestmentType(): void {
        let id
        this.investmentTypeService.removeInvestmentType(id).subscribe(
            (response) => {
                this.dialogRef.close({ data: true });
                this.snackBar.open('Tier deleted successfully', 'OK', {
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
