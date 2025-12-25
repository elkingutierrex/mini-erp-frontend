import { Routes } from '@angular/router';
import { MySales } from './features/sales/my-sales/my-sales';
import { AllSales } from './features/admin/all-sales/all-sales';
import { RolesCrud } from './features/manager/roles-crud/roles-crud';

import { authGuard } from './core/guards/auth.guard-guard';
import { roleGuard } from './core/guards/role.guard-guard';
import { ManagerDashboard } from './features/manager/manager-dash-board/manager-dash-board';
import { ProductsPage } from './features/sales/products-page/products-page';
import { Login } from './core/components/auth/login/login';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'ventas/products' },
  { path: 'auth/login', component: Login },
  { path: 'ventas/products', component: ProductsPage, canActivate: [authGuard] },
  {
  path: 'products',
  loadComponent: () =>
    import('./features/sales/products-page/products-page')
      .then(m => m.ProductsPage),
  },
  { path: 'ventas/mis-ventas', component: MySales, canActivate: [authGuard] },
  { path: 'admin/all-sales', component: AllSales, canActivate: [roleGuard('CanViewAllSales')] },
  { path: 'manager/roles', component: RolesCrud, canActivate: [roleGuard('CanManageRoles')] },
  { path: 'manager/dashboard', component: ManagerDashboard, canActivate: [roleGuard('CanManageRoles')] },
];
