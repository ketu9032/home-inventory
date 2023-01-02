import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IInvestmentTypeData } from 'src/app/models/investment';
import { IMatTableParams } from 'src/app/models/table';

import { PAGE_SIZE_OPTION } from 'src/app/shared/global/table-config';
import { InvestmentTypeService } from '../services/investment-type.service';
import { AddInvestmentTypeComponent } from './add-investment-type/add-investment-type.component';
import { DeleteInvestmentTypeComponent } from './delete-investment-type/delete-investment-type.component';

@Component({
    selector: 'app-investment-type',
    templateUrl: './investment-type.component.html',
    styleUrls: ['./investment-type.component.scss']
})
export class InvestmentTypeComponent implements OnInit {
    displayedColumns: string[] = [
        'investment_type',
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
        private investmentTypeService: InvestmentTypeService,
        public snackBar: MatSnackBar
    ) { }
    ngOnInit(): void {
        this.getInvestmentType();
    }
    sortData(sort: Sort) {
        this.tableParams.orderBy = sort.active;
        this.tableParams.direction = sort.direction;
        this.tableParams.pageNumber = 1;
        this.getInvestmentType();
    }
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }
    getInvestmentType() {
        this.loader = true;
        this.investmentTypeService.getInvestmentType(this.tableParams).subscribe(
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
    onAddNewInvestmentType(): void {
        this.dialog
            .open(AddInvestmentTypeComponent, {
                width: '350px'
            })
            .afterClosed()
            .subscribe((result) => {
                if (result) {
                    this.getInvestmentType();
                }
            });
    }
    onEditInvestmentType(element) {
        this.dialog
            .open(AddInvestmentTypeComponent, {
                width: '350px',
                data: element
            })
            .afterClosed()
            .subscribe((result) => {
                if (result) {
                    this.getInvestmentType();
                }
            });
    }


    onDeleteInvestmentType(id: number) {
        this.dialog
            .open(DeleteInvestmentTypeComponent, {
                width: '350px',
                data: id
            })
            .afterClosed()
            .subscribe((result) => {
                if (result) {
                    this.getInvestmentType();
                }
            });
    }
    pageChanged(event: PageEvent) {
        this.tableParams.pageSize = event.pageSize;
        this.tableParams.pageNumber = event.pageIndex + 1;
        this.getInvestmentType();
    }


}
