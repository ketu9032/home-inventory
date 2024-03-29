import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { IMatTableParams } from 'src/app/models/table';
import { PAGE_SIZE, PAGE_SIZE_OPTION } from 'src/app/shared/global/table-config';
import { ExpenseService } from './services/expense.service';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { MatTableDataSource } from '@angular/material/table';
import { IExpenseData } from 'src/app/models/expense';
import * as moment from 'moment';
import { UserService } from '../user/services/user.service';
import { AuthService } from 'src/app/auth/auth.service';
import { DeleteExpenseComponent } from './delete-expense/delete-expense.component';
import { ExpenseTypeComponent } from './expense-type/expense-type.component';

@Component({
    selector: 'app-expense',
    templateUrl: './expense.component.html',
    styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent implements OnInit {
    displayedColumns: string[] = [
        'date',
        'user_name',
        'account_number',
        'amount',
        'expense_type',
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
    userId?: number;
    categoryId?: number;
    isCashIn?: boolean

    constructor(
        public dialog: MatDialog,
        private expenseService: ExpenseService,
        public snackBar: MatSnackBar,
        public authService: AuthService,
        private userService: UserService,

    ) { }

    ngOnInit(): void {

        this.getExpense();
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
        this.getExpense();
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    getExpense() {
        this.loader = true;

        this.expenseService.getExpense(this.tableParams).subscribe(
            (newCustomers: any[]) => {
                this.dataSource = new MatTableDataSource<IExpenseData>(newCustomers);
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

    onAddNewExpense(): void {
        this.dialog
            .open(AddExpenseComponent, {
                width: '700px'
            })
            .afterClosed()
            .subscribe((result) => {
                if (result) {
                    this.getExpense();
                }
            });
    }

    onEditNewExpense(element) {
        this.dialog
            .open(AddExpenseComponent, {
                width: '700px',
                data: element
            })
            .afterClosed()
            .subscribe((result) => {
                if (result) {
                    this.getExpense();
                }
            });
    }

    onDeleteExpense(id: number) {
        this.dialog
            .open(DeleteExpenseComponent, {
                width: '350px',
                data: id
            })
            .afterClosed()
            .subscribe((result) => {
                if (result) {
                    this.getExpense();
                }
            });
    }

    onAddNewExpenseType(): void {
        this.dialog
            .open(ExpenseTypeComponent, {
                width: '700px'
            })
            .afterClosed()
            .subscribe((result) => {
                if (result) {
                    this.getExpense();
                }
            });
    }

    pageChanged(event: PageEvent) {
        this.tableParams.pageSize = event.pageSize;
        this.tableParams.pageNumber = event.pageIndex + 1;
        this.getExpense()
    }


    clearSearch() {
        this.fromDate = '';
        this.toDate = '';
        this.userId = null;
        this.categoryId = null;
        this.isCashIn = undefined;
        this.tableParams.search = '';

        this.getExpense();
    }
}
