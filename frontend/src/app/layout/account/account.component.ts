import { AuthService } from '../../auth/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IUserData } from 'src/app/models/user';
import {
    PAGE_SIZE,
    PAGE_SIZE_OPTION
} from '../../shared/global/table-config';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { IMatTableParams } from 'src/app/models/table';
import { AccountService } from './services/account.service';
import { AddAccountComponent } from './add-account/add-account.component';
import { DeleteAccountComponent } from './delete-account/delete-account.component';
@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
    displayedColumns: string[] = [
        'date',
        'user_name',
        'balance',
        'account_number',
        'account_holder_name',
        'account_type',
        'bank_name',
        'ifsc_code',
        'branch_Name',
        'action'
    ];
    dataSource: any = [];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    public defaultPageSize = PAGE_SIZE;
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
    isLoggedInUserIsOwner = false
    constructor(
        public dialog: MatDialog,
        private accountService: AccountService,
        public snackBar: MatSnackBar,
        private authService: AuthService
    ) { }
    ngOnInit(): void {
        this.getAccount();
    }
    sortData(sort: Sort) {
        this.tableParams.orderBy = sort.active;
        this.tableParams.direction = sort.direction;
        this.tableParams.pageNumber = 1;
        this.getAccount();
    }
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }
    getAccount() {
        this.loader = true;
        this.accountService.getAccount(this.tableParams).subscribe(
            (newUser: any[]) => {
                this.dataSource = new MatTableDataSource<IUserData>(newUser);
                if (newUser.length > 0) {
                    this.totalRows = newUser[0].total;
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
    onAddNewAccount(): void {
        this.dialog
            .open(AddAccountComponent, {
                width: '700px'
            })
            .afterClosed()
            .subscribe((result) => {
                if (result) {
                    this.getAccount();
                }
            });
    }
    onEditNewAccount(element) {
        this.dialog
            .open(AddAccountComponent, {
                width: '700px',
                data: element
            })
            .afterClosed()
            .subscribe((result) => {
                if (result) {
                    this.getAccount();
                }
            });
    }

    onDeleteAccount(id: number) {
        this.dialog
            .open(DeleteAccountComponent, {
                width: '350px',
                data: id
            })
            .afterClosed()
            .subscribe((result) => {
                if (result) {
                    this.getAccount();
                }
            });
    }
    pageChanged(event: PageEvent) {
        this.tableParams.pageSize = event.pageSize;
        this.tableParams.pageNumber = event.pageIndex + 1;
        this.getAccount();
    }
    toggleType() {
        this.tableParams.active = !this.tableParams.active;
        this.tableParams.pageNumber = 1;
        this.getAccount();
    }

}
