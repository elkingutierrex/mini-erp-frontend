import { Routes } from '@angular/router';
import { MySales } from './features/sales/my-sales/my-sales';
import { AllSales } from './features/admin/all-sales/all-sales';
import { RolesCrud } from './features/manager/roles-crud/roles-crud';

import { authGuard } from './core/guards/auth.guard-guard';
import { roleGuard } from './core/guards/role.guard-guard';
import { ManagerDashboard } from './features/manager/manager-dash-board/manager-dash-board';
import { Login } from './core/components/auth/login/login';

export const routes: Routes = [
  { path : 'auth/login', component: Login },
  { path : 'sales',
    children: [
      {
        path: 'products',
        loadComponent   : () =>
          import('./features/sales/products-page/products-page')
          .then(m => m.ProductsPage),
      },
      {
        path: 'cart',
        loadComponent   : () =>
          import('./features/sales/cart-page/cart-page')
          .then(m => m.CartPage)
      },
      { path: 'mis-ventas', component: MySales, canActivate: [authGuard] },
      { path: 'checkout-success',
        loadComponent    : () =>
          import('./features/sales/checkout-success/checkout-success')
          .then(m => m.CheckoutSuccess),
      },
    ]
  },
   { path: 'checkout-success',
        loadComponent    : () =>
          import('./features/sales/checkout-success/checkout-success')
          .then(m => m.CheckoutSuccess),
      },
  { path : 'admin/all-sales', component: AllSales, canActivate: [roleGuard('CanViewAllSales')] },
  { path : 'manager/roles', component: RolesCrud, canActivate: [roleGuard('CanManageRoles')] },
  { path : 'manager/dashboard', component: ManagerDashboard, canActivate: [roleGuard('CanManageRoles')] },
  { path : '', pathMatch: 'full', redirectTo: 'sales/products' },
];
