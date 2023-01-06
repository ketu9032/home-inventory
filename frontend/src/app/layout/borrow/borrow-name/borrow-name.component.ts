import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IInvestmentTypeData } from 'src/app/models/investment';
import { IMatTableParams } from 'src/app/models/table';

import { PAGE_SIZE_OPTION } from 'src/app/shared/global/table-config';
import { BorrowNameService } from '../services/borrow-name.service';
import { AddBorrowNameComponent } from './add-borrow-name/add-borrow-name.component';
import { DeleteBorrowNameComponent } from './delete-borrow-name/delete-borrow-name.component';


@Component({
    selector: 'app-borrow-name',
    templateUrl: './borrow-name.component.html',
    styleUrls: ['./borrow-name.component.scss']
})
export class BorrowNameComponent implements OnInit {
    displayedColumns: string[] = [
        'date',
        'first_name',
        'last_name',
        'mobile_number',
        'alternative_number',
        'action'
    ];
    dataSource: any = [];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    public defaultPageSize = 5;
    public pageSizeOptions = PAGE_SIZE_OPTION;
    @ViewChild(MatSort) sort: MatSort;
    loader: boolean = false;
    totalRows: number;
    tableParams: IMatTableParams = {
        pageSize: this.defaultPageSize,
        pageNumber: 1,
        orderBy: 'id',
        direction: "desc",
        search: '',
        active: true
    }
    constructor(
        public dialog: MatDialog,
        private borrowNameService: BorrowNameService,
        public snackBar: MatSnackBar
    ) { }
    ngOnInit(): void {
        this.getExpenseType();
    }
    sortData(sort: Sort) {
        this.tableParams.orderBy = sort.active;
        this.tableParams.direction = sort.direction;
        this.tableParams.pageNumber = 1;
        this.getExpenseType();
    }
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }
    getExpenseType() {
        this.loader = true;
        this.borrowNameService.getExpenseType(this.tableParams).subscribe(
            (newTier: any[]) => {
                this.dataSource = new MatTableDataSource<IInvestmentTypeData>(newTier);
                if (newTier.length > 0) {
                    this.totalRows = newTier[0].total;
                }
                setTimeout(() => {
                    this.paginator.pageIndex = this.tableParams.pageNumber - 1;
                    this.paginator.length = +this.totalRows;
                });
                this.loader = false;
            },
            (error) => {
                this.loader = false;
                this.snackBar.open(error.error.message || error.message, 'Ok', {
                    duration: 3000
                });
            },
            () => { }
        );
    }
    onAddNewExpenseType(): void {
        this.dialog
            .open(AddBorrowNameComponent, {
                width: '550px'
            })
            .afterClosed()
            .subscribe((result) => {
                if (result) {
                    this.getExpenseType();
                }
            });
    }
    onEditExpenseType(element) {
        this.dialog
            .open(AddBorrowNameComponent, {
                width: '550px',
                data: element
            })
            .afterClosed()
            .subscribe((result) => {
                if (result) {
                    this.getExpenseType();
                }
            });
    }


    onDeleteExpenseType(id: number) {
        this.dialog
            .open(DeleteBorrowNameComponent, {
                width: '350px',
                data: id
            })
            .afterClosed()
            .subscribe((result) => {
                if (result) {
                    this.getExpenseType();
                }
            });
    }
    pageChanged(event: PageEvent) {
        this.tableParams.pageSize = event.pageSize;
        this.tableParams.pageNumber = event.pageIndex + 1;
        this.getExpenseType();
    }


}
