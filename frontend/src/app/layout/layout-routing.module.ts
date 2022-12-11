import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guard';
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
                canActivate: [AuthGuard],
                loadChildren: () =>
                    import('./dashboard/dashboard.module').then((m) => m.DashboardModule)
            },
            {
                path: 'user',
                canActivate: [AuthGuard],
                loadChildren: () =>
                    import('./user/user.module').then((m) => m.UserModule)
            },

            {
                path: 'expense',
                canActivate: [AuthGuard],
                loadChildren: () =>
                    import('./expense/expense.module').then((m) => m.ExpenseModule)
            },
            {
                path: 'transfer',
                canActivate: [AuthGuard],
                loadChildren: () =>
                    import('./transfer/transfer.module').then((m) => m.TransferModule)
            }

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
