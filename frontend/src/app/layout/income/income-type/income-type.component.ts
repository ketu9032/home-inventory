import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IInvestmentTypeData } from 'src/app/models/investment';
import { IMatTableParams } from 'src/app/models/table';

import { PAGE_SIZE_OPTION } from 'src/app/shared/global/table-config';
import { IncomeTypeService } from '../services/income-type.service';
import { AddIncomeTypeComponent } from './add-income-type/add-income-type.component';
import { DeleteIncomeTypeComponent } from './delete-income-type/delete-income-type.component';



@Component({
    selector: 'app-income-type',
    templateUrl: './income-type.component.html',
    styleUrls: ['./income-type.component.scss']
})
export class IncomeTypeComponent implements OnInit {
    displayedColumns: string[] = [
        'date',
        'income_type',
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
        private incomeTypeService: IncomeTypeService,
        public snackBar: MatSnackBar
    ) { }
    ngOnInit(): void {
        this.getIncomeType();
    }
    sortData(sort: Sort) {
        this.tableParams.orderBy = sort.active;
        this.tableParams.direction = sort.direction;
        this.tableParams.pageNumber = 1;
        this.getIncomeType();
    }
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }
    getIncomeType() {
        this.loader = true;
        this.incomeTypeService.getIncomeType(this.tableParams).subscribe(
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
    onAddNewIncomeType(): void {
        this.dialog
            .open(AddIncomeTypeComponent, {
                width: '350px'
            })
            .afterClosed()
            .subscribe((result) => {
                if (result) {
                    this.getIncomeType();
                }
            });
    }
    onEditExpenseType(element) {
        this.dialog
            .open(AddIncomeTypeComponent, {
                width: '350px',
                data: element
            })
            .afterClosed()
            .subscribe((result) => {
                if (result) {
                    this.getIncomeType();
                }
            });
    }


    onDeleteIncomeType(id: number) {
        this.dialog
            .open(DeleteIncomeTypeComponent, {
                width: '350px',
                data: id
            })
            .afterClosed()
            .subscribe((result) => {
                if (result) {
                    this.getIncomeType();
                }
            });
    }
    pageChanged(event: PageEvent) {
        this.tableParams.pageSize = event.pageSize;
        this.tableParams.pageNumber = event.pageIndex + 1;
        this.getIncomeType();
    }


}
