import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AuthGuard } from '../shared/guard';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {

        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'user',
                pathMatch: 'full',
            },
            {
                path: 'dashboard',
                // canActivate: [AuthGuard],
                loadChildren: () =>
                    import('./dashboard/dashboard.module').then((m) => m.DashboardModule)
            },
            {
                path: 'user',
                // canActivate: [AuthGuard],
                loadChildren: () =>
                    import('./user/user.module').then((m) => m.UserModule)
            },

            {
                path: 'expense',
                // canActivate: [AuthGuard],
                loadChildren: () =>
                    import('./expense/expense.module').then((m) => m.ExpenseModule)
            },
            {
                path: 'transfer',
                // canActivate: [AuthGuard],
                loadChildren: () =>
                    import('./transfer/transfer.module').then((m) => m.TransferModule)
            },
            {
                path: 'account',
                // canActivate: [AuthGuard],
                loadChildren: () =>
                    import('./account/account.module').then((m) => m.AccountModule)
            },
            {
                path: 'income',
                // canActivate: [AuthGuard],
                loadChildren: () =>
                    import('./income/income.module').then((m) => m.IncomeModule)
            },
            {
                path: 'investment',
                // canActivate: [AuthGuard],
                loadChildren: () =>
                    import('./investment/investment.module').then((m) => m.InvestmentModule)
            },
            {
                path: 'borrow',
                // canActivate: [AuthGuard],
                loadChildren: () =>
                    import('./borrow/borrow.module').then((m) => m.BorrowModule)
            }

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
