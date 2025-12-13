import { Routes } from '@angular/router';


import { Login } from './features/auth/login/login';
import { ProductsList } from './features/sales/products-list/products-list';
import { CreateSale } from './features/sales/create-sale/create-sale';
import { MySales } from './features/sales/my-sales/my-sales';
import { AllSales } from './features/admin/all-sales/all-sales';
import { RolesCrud } from './features/manager/roles-crud/roles-crud';

import { authGuard } from './core/guards/auth.guard-guard';
import { roleGuard } from './core/guards/role.guard-guard';
import { ManagerDashboard } from './features/manager/manager-dash-board/manager-dash-board';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'ventas/products' },
  { path: 'auth/login', component: Login },
  { path: 'ventas/products', component: ProductsList, canActivate: [authGuard] },
  { path: 'ventas/create', component: CreateSale, canActivate: [authGuard] },
  { path: 'ventas/mis-ventas', component: MySales, canActivate: [authGuard] },
  { path: 'admin/all-sales', component: AllSales, canActivate: [roleGuard('CanViewAllSales')] },
  { path: 'manager/roles', component: RolesCrud, canActivate: [roleGuard('CanManageRoles')] },
  { path: 'manager/dashboard', component: ManagerDashboard, canActivate: [roleGuard('CanViewAllSales')] },
];
