import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { IMatTableParams } from 'src/app/models/table';
import { PAGE_SIZE, PAGE_SIZE_OPTION } from 'src/app/shared/global/table-config';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../user/services/user.service';
import { AuthService } from 'src/app/auth/auth.service';
import { IncomeService } from './services/investment.service';
import { IIncomeData } from 'src/app/models/income';
import { AddInvestmentComponent } from './add-investment/add-investment.component';
import { DeleteInvestmentComponent } from './delete-investment/delete-investment.component';

@Component({
    selector: 'app-investment',
    templateUrl: './investment.component.html',
    styleUrls: ['./investment.component.scss']
})
export class InvestmentComponent implements OnInit {
    displayedColumns: string[] = [
        'date',
        'user_name',
        'account_type',
        'amount',
        'payment_method',
        'remark',
        'action'
    ];
    dataSource: any = [];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    public defaultPageSize = PAGE_SIZE;
    public pageSizeOptions = PAGE_SIZE_OPTION;
    @ViewChild(MatSort) sort: MatSort;
    loader: boolean = false;
    loggedInUser: boolean = true;
    totalRows: number;
    tableParams: IMatTableParams = {
        pageSize: this.defaultPageSize,
        pageNumber: 1,
        orderBy: 'id',
        direction: "desc",
        search: '',
        active: true,
    }

    loggedInUsersData: any;

    fromDate: string;
    toDate: string;



    constructor(
        public dialog: MatDialog,
        private incomeService: IncomeService,
        public snackBar: MatSnackBar,
        public authService: AuthService,
        private userService: UserService,

    ) { }

    ngOnInit(): void {
        this.getIncome()
    }

    sortData(sort: Sort) {
        if (sort.active === 'expenseId') {
            sort.active = 'expense.id';
        }
        if (sort.active === 'expenseDate') {
            sort.active = 'expense.date';
        }
        if (sort.active === 'categoryName') {
            sort.active = 'c.name';
        }
        if (sort.active === 'userName') {
            sort.active = 'u.user_name';
        }
        this.tableParams.orderBy = sort.active;
        this.tableParams.direction = sort.direction;
        this.tableParams.pageNumber = 1;
        this.getIncome();
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    getIncome() {
        this.loader = true;
        this.incomeService.getIncome(this.tableParams).subscribe(
            (newCustomers: any[]) => {
                this.dataSource = new MatTableDataSource<IIncomeData>(newCustomers);
                if (newCustomers.length > 0) {
                    this.totalRows = newCustomers[0].total;
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

    onAddNewIncome(): void {
        this.dialog
            .open(AddInvestmentComponent, {
                width: '700px'
            })
            .afterClosed()
            .subscribe((result) => {
                if (result) {
                    this.getIncome();
                }
            });
    }

    onEditNewIncome(element) {
        this.dialog
            .open(AddInvestmentComponent, {
                width: '700px',
                data: element
            })
            .afterClosed()
            .subscribe((result) => {
                if (result) {
                    this.getIncome();
                }
            });
    }

    onDeleteIncome(id: number) {
        this.dialog
            .open(DeleteInvestmentComponent, {
                width: '350px',
                data: id
            })
            .afterClosed()
            .subscribe((result) => {
                if (result) {
                    this.getIncome();
                }
            });
    }
    pageChanged(event: PageEvent) {
        this.tableParams.pageSize = event.pageSize;
        this.tableParams.pageNumber = event.pageIndex + 1;
        this.getIncome()
    }


    clearSearch() {
        this.fromDate = '';
        this.toDate = '';
        this.tableParams.search = '';
        this.getIncome();
    }
}
