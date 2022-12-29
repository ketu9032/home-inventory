import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { AuthService } from 'src/app/auth/auth.service';
import { IMatTableParams, IMatTableParamsWithSearchParams } from 'src/app/models/table';
import { ITransferData } from 'src/app/models/transfer';
import { PAGE_SIZE, PAGE_SIZE_OPTION } from 'src/app/shared/global/table-config';
import { UserService } from '../user/services/user.service';
import { AddTransferComponent } from './add-transfer/add-transfer.component';
import { DeleteTransferComponent } from './delete-transfer/delete-transfer.component';
import { TransferService } from './services/transfer.service';

@Component({
    selector: 'app-transfer',
    templateUrl: './transfer.component.html',
    styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {
    displayedColumns: string[] = [
        "date",
        'userName',
        'accountNumber',
        'toUserName',
        'toUserAccountNumber',
        'amount',
        'paymentMethod',
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
    tableParams: IMatTableParamsWithSearchParams = {
        pageSize: this.defaultPageSize,
        pageNumber: 1,
        orderBy: 't.id',
        direction: "desc",
        search: '',
        active: true,
        fromDate: '',
        toDate: '',
        fromUserId: '',
        toUserId: ''
    }
    loggedInUserId: any;
    loggedInUsersData: any;
    loggedInUserRole: any;
    users = []
    fromDate: any;
    toDate: any;
    fromUserId: number;
    toUserId: number;
    currentDate = new Date()
    constructor(
        public dialog: MatDialog,
        private transferService: TransferService,
        public snackBar: MatSnackBar,
        private userService: UserService,
        public authService: AuthService,
    ) { }

    ngOnInit(): void {
        this.loggedInUsersData = this.authService.getUserData();
        // this.loggedInUserId = this.loggedInUsersData.id
        //  this.loggedInUserRole = this.loggedInUsersData.role
        // this.getUserDropDown()
        this.getTransfer();
    }

    sortData(sort: Sort) {
        if (sort.active === 'transferDate') {
            sort.active = 't.date';
        }
        if (sort.active === 'fromUserName') {
            sort.active = 'from_user.user_name';
        }
        if (sort.active === 'toUserName') {
            sort.active = 'to_user.user_name';
        }
        this.tableParams.orderBy = sort.active;
        this.tableParams.direction = sort.direction;
        this.tableParams.pageNumber = 1;
        this.getTransfer();
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    getTransfer() {

        this.transferService.getTransfer().subscribe(
            (newTransfer: any[]) => {
                this.dataSource = new MatTableDataSource<ITransferData>(newTransfer);
                if (newTransfer.length > 0) {
                    this.totalRows = newTransfer[0].total;
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

    onAddNewTransfer(): void {
        this.dialog
            .open(AddTransferComponent, {
                width: '700px'
            })
            .afterClosed()
            .subscribe((result) => {
                if (result) {
                    this.getTransfer();
                }
            });
    }
    onEditNewTransfer(element) {
        this.dialog
            .open(AddTransferComponent, {
                width: '700px',
                data: element
            })
            .afterClosed()
            .subscribe((result) => {
                if (result) {
                    this.getTransfer();
                }
            });
    }
    onDeleteTransfer(id: string): void {
        this.dialog
            .open(DeleteTransferComponent, {
                maxWidth: '400px',
                data: id
            })
            .afterClosed()
            .subscribe((result) => {
                if (result && result.data === true) {
                    this.getTransfer();
                }
            });
    }

    pageChanged(event: PageEvent) {
        this.tableParams.pageSize = event.pageSize;
        this.tableParams.pageNumber = event.pageIndex + 1;
        this.getTransfer();
    }

    clearSearch() {
        this.fromDate = '';
        this.toDate = '';
        this.fromUserId = 0;
        this.toUserId = 0;
        this.tableParams.search = '';
        this.tableParams.fromUserId = '';
        this.tableParams.toUserId = '';
        this.tableParams.fromDate = '';
        this.tableParams.toDate = '';
        this.getTransfer();
    }
}
