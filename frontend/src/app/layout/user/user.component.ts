import { AuthService } from './../../auth/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IUserData } from 'src/app/models/user';
import {
    PAGE_SIZE,
    PAGE_SIZE_OPTION
} from './../../shared/global/table-config';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { UserService } from './services/user.service';
import { AddUserComponent } from './add-user/add-user.component';
import { IMatTableParams } from 'src/app/models/table';
import { DeleteUserComponent } from './delete-user/delete-user.component';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    displayedColumns: string[] = [
        'date',
        'user_name',
        'email',
        'user_wise_balance',
        'mobile_number',
        'action',

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
        private userService: UserService,
        public snackBar: MatSnackBar,
        private authService: AuthService
    ) { }

    ngOnInit(): void {
        // const loggedInUser = this.authService.getUserData()
        // this.isLoggedInUserIsOwner = loggedInUser.role.toLowerCase() === 'owner' ? true : false;
        this.getUser();
    }

    sortData(sort: Sort) {
        this.tableParams.orderBy = sort.active;
        this.tableParams.direction = sort.direction;
        this.tableParams.pageNumber = 1;
        this.getUser();
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    getUser() {
        this.loader = true;
        this.userService.getUser(this.tableParams).subscribe(
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
    getTotalBalance() {



        // return this.dataSource.filteredData.map(t => t.balance).reduce((acc, value) => acc + value, 0);
    }
    onAddNewUser(): void {
        this.dialog
            .open(AddUserComponent, {
                width: '700px'
            })
            .afterClosed()
            .subscribe((result) => {
                if (result) {
                    this.getUser();
                }
            });
    }
    onEditNewUser(element) {
        this.dialog
            .open(AddUserComponent, {
                width: '700px',
                data: element
            })
            .afterClosed()
            .subscribe((result) => {
                if (result) {
                    this.getUser();
                }
            });
    }
    onDeleteUser(id: number) {
        this.dialog
            .open(DeleteUserComponent, {
                width: '400px',
                data: id
            })
            .afterClosed()
            .subscribe((result) => {
                if (result) {
                    this.getUser();
                }
            });
    }

    pageChanged(event: PageEvent) {
        this.tableParams.pageSize = event.pageSize;
        this.tableParams.pageNumber = event.pageIndex + 1;
        this.getUser();
    }
}
