import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/shared/services';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    public showMenu: string;
    userPermission: any;
    constructor(private restService: RestService) { }

    menu: { link: string, name: string, icon: string, key: string }[] = [
        {
            link: '/dashboard',
            name: 'Dashboard',
            icon: 'dashboard',
            key: 'dashboard'
        },
        {
            link: '/user',
            name: 'User',
            icon: 'people',
            key: 'users'
        },
        {
            link: '/account',
            name: 'Account',
            icon: 'account_balance',
            key: 'account'
        },
        {
            link: '/expense',
            name: 'Expense',
            icon: 'attach_money',
            key: 'expense'
        },
        {
            link: '/transfer',
            name: 'Transfer',
            icon: 'loop',
            key: 'transfer'
        },
        {
            link: '/income',
            name: 'Income',
            icon: 'compare_arrows',
            key: 'income'
        }
    ]

    ngOnInit() {
        this.showMenu = '';
        const user = this.restService.getUserData();
        this.userPermission = user.permission;
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }
}
