import { Routes } from '@angular/router';
import { MySales } from './features/sales/my-sales/my-sales';
import { AllSales } from './features/admin/all-sales/all-sales';
import { RolesCrud } from './features/manager/roles-crud/roles-crud';

import { authGuard } from './core/guards/auth.guard-guard';
import { roleGuard } from './core/guards/role.guard-guard';
import { ManagerDashboard } from './features/manager/manager-dash-board/manager-dash-board';
import { Login } from './core/components/auth/login/login';

export const routes: Routes = [
  { path: 'auth/login', component: Login },
<<<<<<< HEAD
  { path: 'ventas/products', component: ProductsList, canActivate: [authGuard] },
  {
  path: 'products',
  loadComponent: () =>
    import('./features/sales/pages/products-page/products-page')
      .then(m => m.ProductsPage),
  },
  { path: 'ventas/create', component: CreateSale, canActivate: [authGuard] },
  { path: 'ventas/mis-ventas', component: MySales, canActivate: [authGuard] },
=======
  { path: 'ventas',
    children: [
      {
        path: 'products',
        loadComponent: () =>
          import('./features/sales/products-page/products-page')
        .then(m => m.ProductsPage),
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./features/sales/cart-page/cart-page')
        .then(m => m.CartPage)
      },
      { path: 'mis-ventas', component: MySales, canActivate: [authGuard] },

    ]
  },
>>>>>>> recovery-fix
  { path: 'admin/all-sales', component: AllSales, canActivate: [roleGuard('CanViewAllSales')] },
  { path: 'manager/roles', component: RolesCrud, canActivate: [roleGuard('CanManageRoles')] },
  { path: 'manager/dashboard', component: ManagerDashboard, canActivate: [roleGuard('CanManageRoles')] },
  { path: '', pathMatch: 'full', redirectTo: 'ventas/products' },
];
